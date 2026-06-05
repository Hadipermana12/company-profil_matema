const mysql = require('mysql2/promise');
require('dotenv').config();

async function setup() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'kmma_db'
  });

  console.log('Connected to MySQL. Creating tables...');

  // Site Settings
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INT PRIMARY KEY DEFAULT 1,
      site_name VARCHAR(255) DEFAULT 'KMMA',
      site_description TEXT,
      logo_url VARCHAR(255),
      playstore_link VARCHAR(255),
      appstore_link VARCHAR(255),
      contact_email VARCHAR(255),
      contact_phone VARCHAR(255),
      contact_address TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Sections (Home, About, etc)
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS sections (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) UNIQUE,
      title VARCHAR(255),
      subtitle TEXT,
      content TEXT,
      image_url VARCHAR(255),
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // FAQs
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS faqs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      question TEXT,
      answer TEXT,
      sort_order INT DEFAULT 0
    )
  `);

  // Products
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      description TEXT,
      image_url VARCHAR(255),
      category ENUM('produk', 'layanan') DEFAULT 'produk',
      sort_order INT DEFAULT 0
    )
  `);

  // Users for Admin Login
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) UNIQUE,
      password VARCHAR(255),
      name VARCHAR(100)
    )
  `);

  // Insert default admin if empty
  const [users] = await connection.execute('SELECT * FROM users');
  if (users.length === 0) {
    // Default password is 'admin123' (In production, use bcrypt)
    await connection.execute(`
      INSERT INTO users (username, password, name) 
      VALUES ('admin', 'admin123', 'Administrator')
    `);
  }

  // Insert initial data if empty
  const [settings] = await connection.execute('SELECT * FROM site_settings');
  if (settings.length === 0) {
    await connection.execute(`
      INSERT INTO site_settings (id, site_name, site_description, playstore_link, appstore_link)
      VALUES (1, 'KMMA', 'Sinergi Untuk Sejahtera', '#', '#')
    `);
  }

  const [sectionData] = await connection.execute('SELECT * FROM sections');
  if (sectionData.length === 0) {
    await connection.execute(`
      INSERT INTO sections (name, title, subtitle, content) VALUES 
      ('hero', 'KMMA ONE', 'Smart Cooperative Platform', 'Platform koperasi digital yang memudahkan anggota dalam mengakses layanan simpan pinjam, pembayaran, informasi, dan berbagai kebutuhan kapan saja, di mana saja.'),
      ('about', 'Tentang Kami', 'Sinergi Untuk Sejahtera', 'KMMA adalah koperasi modern yang berfokus pada kesejahteraan anggota melalui teknologi digital.'),
      ('products', 'Produk Unggulan', 'Layanan Simpan Pinjam Terbaik', 'Kami menyediakan berbagai layanan keuangan yang mudah diakses.'),
      ('contact', 'Hubungi Kami', 'Siap Melayani Anda', 'Silakan hubungi kami melalui saluran berikut.')
    `);
  }

  console.log('Database setup complete!');
  await connection.end();
}

setup().catch(err => {
  console.error('Error setting up database:', err);
  process.exit(1);
});
