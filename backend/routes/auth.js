const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ error: 'Введите логин и пароль' });
  }
  try {
    const result = await pool.query(
      'SELECT login, role FROM users WHERE login = $1 AND password = $2',
      [login, password]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Неверный логин или пароль' });
    }
    const user = result.rows[0];
    req.session.user = user;
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

router.get('/me', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ error: 'Не авторизован' });
  }
});

router.post('/register', async (req, res) => {
  const { login, password, confirmPassword } = req.body;
  if (!login || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Заполните все поля' });
  }
  if (login.length < 3) {
    return res.status(400).json({ error: 'Логин должен содержать минимум 3 символа' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Пароль должен содержать минимум 6 символов' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Пароли не совпадают' });
  }
  try {
    const exists = await pool.query('SELECT login FROM users WHERE login = $1', [login]);
    if (exists.rows.length > 0) {
      return res.status(409).json({ error: 'Пользователь с таким логином уже существует' });
    }
    await pool.query(
      'INSERT INTO users (login, password, role) VALUES ($1, $2, $3)',
      [login, password, 'customer']
    );
    const user = { login, role: 'customer' };
    req.session.user = user;
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
