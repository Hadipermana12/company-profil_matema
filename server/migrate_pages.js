const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'kmma_db'
    });

    console.log('Connected to MySQL. Adding new pages sections...');

    const newSections = [
      {
        name: 'tentang_sejarah',
        title: 'Sejarah Koperasi KMMA',
        subtitle: 'Perjalanan Kami',
        content: 'Didirikan dengan semangat gotong royong, Koperasi KMMA hadir untuk menjadi mitra finansial terpercaya bagi seluruh anggota. Sejak awal berdirinya, kami terus berinovasi...',
        image_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000'
      },
      {
        name: 'tentang_struktur',
        title: 'Struktur Organisasi',
        subtitle: 'Tim Pengurus',
        content: 'Dipimpin oleh para profesional yang berdedikasi tinggi dan berpengalaman dalam industri keuangan dan pemberdayaan masyarakat.',
        image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000'
      },
      {
        name: 'beasiswa_page',
        title: 'Program Beasiswa Pendidikan KMMA',
        subtitle: 'Investasi Masa Depan',
        content: 'Sebagai bentuk kepedulian terhadap pendidikan, KMMA secara rutin menyalurkan beasiswa kepada putra-putri anggota yang berprestasi. Kami percaya bahwa pendidikan adalah kunci kesejahteraan.',
        image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000'
      },
      {
        name: 'pinjaman_page',
        title: 'Solusi Pembiayaan Cepat & Aman',
        subtitle: 'Layanan Pinjaman',
        content: 'Kami menyediakan berbagai jenis fasilitas pinjaman dengan proses yang transparan, bunga kompetitif, dan persyaratan yang mudah untuk mendukung kebutuhan finansial Anda.',
        image_url: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&q=80&w=1000'
      }
    ];

    for (const section of newSections) {
      // Check if it exists
      const [rows] = await connection.execute('SELECT name FROM sections WHERE name = ?', [section.name]);
      
      if (rows.length === 0) {
        await connection.execute(
          'INSERT INTO sections (name, title, subtitle, content, image_url) VALUES (?, ?, ?, ?, ?)',
          [section.name, section.title, section.subtitle, section.content, section.image_url]
        );
        console.log(`Section inserted: ${section.name}`);
      } else {
        console.log(`Section already exists: ${section.name}`);
      }
    }

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
