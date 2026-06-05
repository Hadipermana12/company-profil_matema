const mysql = require('mysql2/promise');
require('dotenv').config();

async function seed() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'kmma_db'
    });

    console.log('Connected to MySQL. Adding dummy loan products...');

    const dummyLoans = [
      {
        name: 'Pinjaman Multiguna',
        description: 'Fasilitas pembiayaan serbaguna untuk berbagai kebutuhan konsumtif maupun produktif dengan persyaratan mudah dan suku bunga kompetitif.',
        image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000',
        category: 'layanan',
        sort_order: 1
      },
      {
        name: 'Pinjaman Syariah',
        description: 'Pembiayaan bebas riba yang dikelola sesuai dengan prinsip syariat Islam. Solusi aman dan menenangkan untuk kebutuhan finansial Anda.',
        image_url: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&q=80&w=1000',
        category: 'layanan',
        sort_order: 2
      },
      {
        name: 'Pinjaman Darurat',
        description: 'Dana cepat cair untuk mengatasi kebutuhan mendesak seperti biaya kesehatan atau insiden tak terduga. Proses persetujuan instan bagi anggota aktif.',
        image_url: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=1000',
        category: 'layanan',
        sort_order: 3
      }
    ];

    for (const loan of dummyLoans) {
      // Avoid inserting duplicates based on name
      const [rows] = await connection.execute('SELECT name FROM products WHERE name = ?', [loan.name]);
      
      if (rows.length === 0) {
        await connection.execute(
          'INSERT INTO products (name, description, image_url, category, sort_order) VALUES (?, ?, ?, ?, ?)',
          [loan.name, loan.description, loan.image_url, loan.category, loan.sort_order]
        );
        console.log(`Product inserted: ${loan.name}`);
      } else {
        console.log(`Product already exists: ${loan.name}`);
      }
    }

    console.log('Dummy products seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
