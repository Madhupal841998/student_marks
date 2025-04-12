const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
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

async function initializeDatabase() {
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

  try {
    await pool.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    console.log(`Database ${process.env.DB_NAME} created successfully`);
  } catch (err) {
    if (err.code === '42P04') {
      console.log(`Database ${process.env.DB_NAME} already exists`);
    } else {
      console.error('Error creating database:', err);
      process.exit(1);
    }
  } finally {
    await pool.end();
  }
  
  const dbPool = new Pool({
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
  try {
    const schemaPath = path.join(__dirname, '../schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    await dbPool.query(schemaSql);
    console.log('Database schema created successfully');
    
    await seedInitialData(dbPool);
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  } finally {
    await dbPool.end();
  }
}

async function seedInitialData(pool) {
  try {
    await pool.query(`
      INSERT INTO subjects (subject_name, subject_code, description)
      VALUES 
        ('Mathematics', 'MATH101', 'Basic Mathematics'),
        ('Physics', 'PHYS101', 'Introduction to Physics'),
        ('Chemistry', 'CHEM101', 'Basic Chemistry')
      ON CONFLICT (subject_name) DO NOTHING
    `);

    console.log('Initial data seeded successfully');
  } catch (err) {
    console.error('Error seeding initial data:', err);
  }
}

initializeDatabase();