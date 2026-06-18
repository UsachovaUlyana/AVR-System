const express = require('express');
const session = require('express-session');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'avr-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
}));

app.use('/api', require('./routes/auth'));
app.use('/api/orders', require('./routes/orders'));

async function ensureDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS order_messages (
      id SERIAL PRIMARY KEY,
      order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
      sender_login VARCHAR(50) REFERENCES users(login),
      sender_role VARCHAR(20) NOT NULL,
      text TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS order_reads (
      order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
      user_login VARCHAR(50) REFERENCES users(login),
      last_read_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (order_id, user_login)
    )
  `);
}

ensureDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend запущен на порту ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Ошибка инициализации базы данных', err);
    process.exit(1);
  });
