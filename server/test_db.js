const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  console.log('Testing connection with:');
  console.log('Host:', process.env.DB_HOST || '127.0.0.1');
  console.log('User:', process.env.DB_USER || 'root');
  console.log('Database:', process.env.DB_NAME || 'kmma_db');
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'kmma_db',
      connectTimeout: 5000
    });
    console.log('Successfully connected to the database!');
    await connection.end();
  } catch (err) {
    console.error('Connection failed!');
    console.error('Error Code:', err.code);
    console.error('Error Message:', err.message);
    console.error('Full Error:', err);
  }
}

testConnection();
