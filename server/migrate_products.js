require('dotenv').config();
const mysql = require('mysql2/promise');

async function migrate() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'kmma_db'
    });

    console.log('Connected to DB. Adding category column...');
    
    // Add category column if it doesn't exist
    await connection.execute(`
      ALTER TABLE products 
      ADD COLUMN category ENUM('produk', 'layanan') DEFAULT 'produk'
    `);
    
    console.log('Migration successful!');
    process.exit(0);
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('Column category already exists. Skipping.');
      process.exit(0);
    } else {
      console.error('Migration failed:', err.message);
      process.exit(1);
    }
  }
}

migrate();
