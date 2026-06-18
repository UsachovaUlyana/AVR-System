const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  user: process.env.POSTGRES_USER || 'avr',
  password: process.env.POSTGRES_PASSWORD || 'avrpass',
  database: process.env.POSTGRES_DB || 'avr_system',
});

module.exports = pool;
