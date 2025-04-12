const { Pool } = require('pg');
require('dotenv').config();

const sslCa = [
  process.env.DB_SSL_CA_LINE1,
  process.env.DB_SSL_CA_LINE2,
  process.env.DB_SSL_CA_LINE3,
  process.env.DB_SSL_CA_LINE4,
  process.env.DB_SSL_CA_LINE5,
  process.env.DB_SSL_CA_LINE6,
  process.env.DB_SSL_CA_LINE7,
  process.env.DB_SSL_CA_LINE8,
  process.env.DB_SSL_CA_LINE9,
  process.env.DB_SSL_CA_LINE10,
  process.env.DB_SSL_CA_LINE11,
  process.env.DB_SSL_CA_LINE12,
  process.env.DB_SSL_CA_LINE13,
  process.env.DB_SSL_CA_LINE14,
  process.env.DB_SSL_CA_LINE15,
  process.env.DB_SSL_CA_LINE16,
  process.env.DB_SSL_CA_LINE17,
  process.env.DB_SSL_CA_LINE18,
  process.env.DB_SSL_CA_LINE19,
  process.env.DB_SSL_CA_LINE20,
  process.env.DB_SSL_CA_LINE21,
  process.env.DB_SSL_CA_LINE22,
  process.env.DB_SSL_CA_LINE23,
  process.env.DB_SSL_CA_LINE24,
  process.env.DB_SSL_CA_LINE25,
  process.env.DB_SSL_CA_LINE26,
  process.env.DB_SSL_CA_LINE27,
  process.env.DB_SSL_CA_LINE28,
  process.env.DB_SSL_CA_LINE29,
  process.env.DB_SSL_CA_LINE30,
  process.env.DB_SSL_CA_LINE31,
  process.env.DB_SSL_CA_LINE32,
  process.env.DB_SSL_CA_LINE33,
  process.env.DB_SSL_CA_LINE34,
  process.env.DB_SSL_CA_LINE35,
  process.env.DB_SSL_CA_LINE36,
  process.env.DB_SSL_CA_LINE37,
  process.env.DB_SSL_CA_LINE38,
  process.env.DB_SSL_CA_LINE39,
  process.env.DB_SSL_CA_LINE40,
].join('\n');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: true,
    ca: sslCa,
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
