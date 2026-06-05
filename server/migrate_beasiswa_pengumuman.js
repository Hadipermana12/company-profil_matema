const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'kmma_db'
    });

    console.log('Connected to MySQL. Adding beasiswa_pengumuman section...');

    // Check if it already exists
    const [rows] = await connection.execute('SELECT name FROM sections WHERE name = "beasiswa_pengumuman"');
    
    if (rows.length === 0) {
      await connection.execute(
        `INSERT INTO sections (name, title, subtitle, content, image_url) 
         VALUES (
           'beasiswa_pengumuman', 
           'Pengumuman Penerima Beasiswa KMMA 2026', 
           'Selamat kepada para penerima terpilih!', 
           'Berikut adalah daftar nama mahasiswa dan pelajar yang dinyatakan lolos seleksi berkas dan wawancara program Beasiswa KMMA Tahun Ajaran 2026:\\n\\n1. Ahmad Fauzi (Universitas Indonesia)\\n2. Syarifah Aulia (Institut Teknologi Bandung)\\n3. Rian Hidayat (Universitas Gadjah Mada)\\n4. Chelsea Olivia (Universitas Padjadjaran)\\n5. Muhammad Rizky (Universitas Diponegoro)\\n\\nBagi para pemenang, mohon segera melakukan konfirmasi dan melengkapi dokumen penunjang melalui kontak yang tertera di menu Hubungi Kami.', 
           NULL
         )`
      );
      console.log('Section "beasiswa_pengumuman" created successfully.');
    } else {
      console.log('Section "beasiswa_pengumuman" already exists.');
    }

    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

run();
