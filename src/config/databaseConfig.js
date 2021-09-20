require('dotenv').config();
const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DATABASE_URL,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE,
});

module.exports = pool;
