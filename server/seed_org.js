const db = require('./config/db');

const seedData = {
  dewan_penasehat: [
    "Evi Sulistyorini",
    "Noer Rachman E"
  ],
  dewan_pengurus: [
    { "role": "Ketua", "name": "Arif TW" },
    { "role": "Sekretaris", "name": "Hendro W" },
    { "role": "Bendahara", "name": "Anindita Irnilaningtyas" }
  ],
  dewan_pengawas: [
    "Putu RS",
    "Dian Krisita",
    "Dian H"
  ],
  units: [
    { "title": "SOSIAL & KEANGGOTAAN", "name": "Tumarni" },
    { "title": "UNIT PEMBIAYAAN & OPERASIONAL ASSET", "name": "Slamet W" },
    { "title": "UNIT METEMA", "name": "Aditya AH" },
    { "title": "UNIT PENGEMBANGAN BISNIS", "name": "Tri Laksana Saputra" },
    { "title": "UNIT RETAIL & COMMERCIAL", "name": "Arkhi Nur Cahyono" }
  ],
  retail_sub: {
    "kepala_toko": "Agus",
    "admin": "Fadlan",
    "kasir": [
      "Rohim",
      "Rahmat",
      "Hermansyah"
    ]
  }
};

const run = async () => {
  try {
    const jsonStr = JSON.stringify(seedData, null, 2);
    
    // Check if the record already exists
    const [existing] = await db.execute('SELECT * FROM sections WHERE name = ?', ['tentang_struktur_data']);
    
    if (existing.length > 0) {
      console.log('Record tentang_struktur_data already exists, updating...');
      await db.execute(
        'UPDATE sections SET title = ?, subtitle = ?, content = ? WHERE name = ?',
        ['Struktur Organisasi Data', 'Data Chart Struktur', jsonStr, 'tentang_struktur_data']
      );
      console.log('Update successful!');
    } else {
      console.log('Record tentang_struktur_data does not exist, inserting...');
      await db.execute(
        'INSERT INTO sections (name, title, subtitle, content) VALUES (?, ?, ?, ?)',
        ['tentang_struktur_data', 'Struktur Organisasi Data', 'Data Chart Struktur', jsonStr]
      );
      console.log('Insert successful!');
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

run();
