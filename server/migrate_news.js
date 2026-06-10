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

    console.log('Connected to MySQL. Setting up "news" table...');

    // Create Table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS news (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        content TEXT,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        sort_order INT DEFAULT 0
      )
    `);
    console.log('Table "news" ready.');

    // Check if seeded
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM news');
    if (rows[0].count === 0) {
      console.log('Seeding initial news articles...');
      
      const dummyArticles = [
        {
          title: 'Promo Pinjaman Spesial Hari Koperasi: Bunga Ringan Mulai 5%!',
          category: 'Promo',
          content: 'Menyambut Hari Koperasi Nasional, KMMA menghadirkan program Promo Pinjaman Spesial dengan bunga super ringan mulai dari 5% per tahun untuk seluruh anggota aktif. Program ini dirancang khusus untuk membantu memenuhi kebutuhan pembiayaan modal usaha, renovasi rumah, pendidikan, maupun kebutuhan darurat lainnya.\n\nKeunggulan promo ini:\n- Bunga bersaing mulai 5% efektif per tahun\n- Proses persetujuan cepat (maksimal 3 hari kerja)\n- Jangka waktu pengembalian fleksibel hingga 5 tahun\n- Tanpa potongan biaya administrasi tersembunyi\n\nMasa berlaku promo ini terbatas mulai 1 Juni hingga 31 Juli 2026. Anggota dapat melihat detail informasi produk pada menu Pinjaman dan menghubungi staf admin koperasi untuk panduan pemenuhan dokumen pendukung.',
          image_url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
          sort_order: 0
        },
        {
          title: 'KMMA Gelar Aksi Sosial Peduli Lingkungan: Penanaman 1000 Pohon di Hutan Kota',
          category: 'Kegiatan',
          content: 'Sebagai bentuk komitmen terhadap tanggung jawab sosial dan lingkungan (TJSL), pengurus beserta anggota KMMA menyelenggarakan aksi penanaman 1000 bibit pohon mahoni dan trembesi di kawasan Hutan Kota pada akhir pekan kemarin.\n\nAcara dibuka langsung oleh Kepala Koperasi KMMA dan dihadiri oleh jajaran perwakilan dinas lingkungan hidup setempat. Selain penanaman pohon, koperasi juga membagikan puluhan paket sembako kepada para pekerja kebersihan dan masyarakat sekitar yang membutuhkan.\n\n"Kegiatan ini merupakan bagian dari pilar keberlanjutan KMMA. Kami percaya bahwa koperasi yang kuat tidak hanya menyejahterakan anggotanya secara ekonomi, tetapi juga berkontribusi positif bagi kelestarian bumi tempat kita tinggal," ujar Kepala Koperasi dalam sambutannya.\n\nKMMA berkomitmen untuk menyelenggarakan kegiatan sosial serupa secara rutin setiap triwulan sebagai wujud nyata asas kekeluargaan koperasi.',
          image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
          sort_order: 1
        },
        {
          title: 'Pengumuman Seleksi Berkas Program Beasiswa KMMA Tahun Ajaran 2026/2027',
          category: 'Pengumuman',
          content: 'Panitia Seleksi Beasiswa KMMA secara resmi mengumumkan hasil seleksi tahap pertama (berkas administrasi) untuk program Beasiswa Pendidikan Prestasi tahun ajaran 2026/2027.\n\nDari ratusan berkas pendaftaran anak anggota koperasi yang masuk, panitia telah menyaring kandidat terbaik yang dinyatakan berhak melaju ke tahap berikutnya, yaitu wawancara tatap muka. \n\nDaftar nama kandidat yang lolos seleksi berkas dapat langsung diakses secara transparan melalui halaman menu Beasiswa di website resmi ini. Sesi wawancara dijadwalkan akan berlangsung pada tanggal 10-12 Juni 2026 bertempat di kantor pusat KMMA.\n\nBagi para peserta yang dinyatakan lolos berkas, diharapkan untuk mencetak kartu peserta dan membawa dokumen asli rapor/transkrip nilai serta surat rekomendasi saat menghadiri wawancara. Panitia mengucapkan selamat berjuang kepada seluruh kandidat!',
          image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
          sort_order: 2
        }
      ];

      for (const art of dummyArticles) {
        await connection.execute(
          'INSERT INTO news (title, category, content, image_url, sort_order) VALUES (?, ?, ?, ?, ?)',
          [art.title, art.category, art.content, art.image_url, art.sort_order]
        );
      }
      console.log('Seeding finished successfully.');
    } else {
      console.log('News table already has data. Seeding skipped.');
    }

    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

run();
