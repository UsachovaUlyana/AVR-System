const express = require('express');
const router = express.Router();
const pool = require('../db');

function requireAuth(req, res, next) {
  if (!req.session.user) return res.status(401).json({ error: 'Не авторизован' });
  next();
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.session.user || req.session.user.role !== role) {
      return res.status(403).json({ error: 'Нет доступа' });
    }
    next();
  };
}

function canAccessOrder(user, order) {
  if (user.role === 'executor') return true;
  return order.customer_login === user.login;
}

const ORDER_LIST_FIELDS = `
  o.*,
  GREATEST(
    o.created_at,
    COALESCE(MAX(om.created_at), o.created_at),
    COALESCE(MAX(sh.changed_at), o.created_at)
  ) AS last_activity_at,
  CASE
    WHEN o.customer_login IS NULL THEN 0
    ELSE COUNT(DISTINCT unread.id)::int
  END AS unread_count
`;

function orderListJoins() {
  return `
    LEFT JOIN order_messages om ON om.order_id = o.id
    LEFT JOIN status_history sh ON sh.order_id = o.id
    LEFT JOIN order_reads reads ON reads.order_id = o.id AND reads.user_login = $1
    LEFT JOIN order_messages unread
      ON unread.order_id = o.id
      AND unread.sender_login <> $1
      AND unread.created_at > COALESCE(reads.last_read_at, '-infinity'::timestamptz)
  `;
}

const ORDER_LIST_GROUP = 'GROUP BY o.id';
const ORDER_LIST_SORT = 'ORDER BY last_activity_at DESC, o.created_at DESC';

// Все заявки (исполнитель)
router.get('/', requireAuth, requireRole('executor'), async (req, res) => {
  try {
    const { status } = req.query;
    const params = [req.session.user.login];
    let query = `
      SELECT ${ORDER_LIST_FIELDS}
      FROM orders o
      ${orderListJoins()}
    `;
    if (status) {
      query += ' WHERE o.status = $2';
      params.push(status);
    }
    query += ` ${ORDER_LIST_GROUP} ${ORDER_LIST_SORT}`;
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Свои заявки (заказчик)
router.get('/my', requireAuth, requireRole('customer'), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT ${ORDER_LIST_FIELDS}
       FROM orders o
       ${orderListJoins()}
       WHERE o.customer_login = $1
       ${ORDER_LIST_GROUP}
       ${ORDER_LIST_SORT}`,
      [req.session.user.login]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Детали заявки + чат + история
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const orderResult = await pool.query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
    if (orderResult.rows.length === 0) return res.status(404).json({ error: 'Заявка не найдена' });

    const order = orderResult.rows[0];
    if (!canAccessOrder(req.session.user, order)) {
      return res.status(403).json({ error: 'Нет доступа' });
    }

    await pool.query(
      `INSERT INTO order_reads (order_id, user_login, last_read_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (order_id, user_login)
       DO UPDATE SET last_read_at = EXCLUDED.last_read_at`,
      [req.params.id, req.session.user.login]
    );

    const chatAvailable = Boolean(order.customer_login);
    const messagesResult = chatAvailable
      ? await pool.query(
          'SELECT * FROM order_messages WHERE order_id = $1 ORDER BY created_at ASC',
          [req.params.id]
        )
      : { rows: [] };
    const historyResult = await pool.query(
      'SELECT * FROM status_history WHERE order_id = $1 ORDER BY changed_at ASC',
      [req.params.id]
    );
    order.chat_available = chatAvailable;
    order.messages = messagesResult.rows;
    order.status_history = historyResult.rows;
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Сообщение в чат конкретной заявки
router.post('/:id/messages', requireAuth, async (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Введите сообщение' });
  }
  try {
    const orderResult = await pool.query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
    if (orderResult.rows.length === 0) return res.status(404).json({ error: 'Заявка не найдена' });

    const order = orderResult.rows[0];
    if (!canAccessOrder(req.session.user, order)) {
      return res.status(403).json({ error: 'Нет доступа' });
    }
    if (!order.customer_login) {
      return res.status(400).json({ error: 'Чат недоступен для заявок без авторизации заказчика' });
    }

    const result = await pool.query(
      `INSERT INTO order_messages (order_id, sender_login, sender_role, text)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [req.params.id, req.session.user.login, req.session.user.role, text.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Создать заявку (заказчик)
router.post('/', requireAuth, requireRole('customer'), async (req, res) => {
  const { customerName, phone, address, workType, description } = req.body;
  if (!customerName || !phone || !address || !workType || !description) {
    return res.status(400).json({ error: 'Все поля обязательны' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO orders (customer_login, customer_name, phone, address, work_type, description)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.session.user.login, customerName, phone, address, workType, description]
    );
    const order = result.rows[0];
    await pool.query(
      'INSERT INTO status_history (order_id, status, comment) VALUES ($1, $2, $3)',
      [order.id, 'Новая', 'Заявка создана']
    );
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Публичная форма заявки — работает и без авторизации, и с ней
router.post('/public', async (req, res) => {
  const { customerName, phone, address, workType, description } = req.body;
  if (!customerName || !phone || !address || !workType || !description) {
    return res.status(400).json({ error: 'Все поля обязательны' });
  }
  // Если пользователь авторизован как заказчик — привязываем заявку к его аккаунту
  const customerLogin = (req.session.user && req.session.user.role === 'customer')
    ? req.session.user.login
    : null;
  try {
    const result = await pool.query(
      `INSERT INTO orders (customer_login, customer_name, phone, address, work_type, description)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [customerLogin, customerName, phone, address, workType, description]
    );
    const order = result.rows[0];
    await pool.query(
      'INSERT INTO status_history (order_id, status, comment) VALUES ($1, $2, $3)',
      [order.id, 'Новая', 'Заявка создана через форму на сайте']
    );
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Обновить только статус и комментарий к статусу (исполнитель)
router.patch('/:id/status', requireAuth, requireRole('executor'), async (req, res) => {
  const { status, statusComment } = req.body;
  const validStatuses = ['Новая', 'В работе', 'Выполнена', 'Отклонена'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Неверный статус' });
  }
  if (status === 'Отклонена' && (!statusComment || !statusComment.trim())) {
    return res.status(400).json({ error: 'Укажите причину отклонения заявки' });
  }
  try {
    const current = await pool.query('SELECT status FROM orders WHERE id = $1', [req.params.id]);
    if (current.rows.length === 0) return res.status(404).json({ error: 'Заявка не найдена' });

    await pool.query('UPDATE orders SET status = $1 WHERE id = $2', [status, req.params.id]);

    if (status !== current.rows[0].status) {
      await pool.query(
        'INSERT INTO status_history (order_id, status, comment) VALUES ($1, $2, $3)',
        [req.params.id, status, statusComment ? statusComment.trim() : '']
      );
    }

    const updated = await pool.query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
    const messages = await pool.query(
      'SELECT * FROM order_messages WHERE order_id = $1 ORDER BY created_at ASC',
      [req.params.id]
    );
    const history = await pool.query(
      'SELECT * FROM status_history WHERE order_id = $1 ORDER BY changed_at ASC',
      [req.params.id]
    );
    const order = updated.rows[0];
    order.messages = messages.rows;
    order.status_history = history.rows;
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
