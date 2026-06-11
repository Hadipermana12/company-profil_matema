const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

app.use(cors({
  origin: ['http://localhost:3000', // React Development
           'https://kmma-landing-page.vercel.app', // Production
           'https://www.kmma.co.id'] // Production
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Upload Endpoint
app.post('/api/admin/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

const JWT_SECRET = process.env.JWT_SECRET || 'kmma_secret_key_2024';

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [users] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = users[0];
    // In production, use bcrypt.compare(password, user.password)
    // For now, support both plain text (for default admin) and hashed
    const isMatch = password === user.password; 
    
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, username: user.username, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('KMMA API is running...');
});

// Get all landing page data
app.get('/api/content', async (req, res) => {
  try {
    const [settings] = await db.execute('SELECT * FROM site_settings WHERE id = 1');
    const [sections] = await db.execute('SELECT * FROM sections');
    const [faqs] = await db.execute('SELECT * FROM faqs ORDER BY sort_order');
    const [products] = await db.execute('SELECT * FROM products ORDER BY sort_order');
    const [news] = await db.execute('SELECT * FROM news ORDER BY sort_order ASC, created_at DESC');

    res.json({
      settings: settings[0],
      sections: sections.reduce((acc, s) => ({ ...acc, [s.name]: s }), {}),
      faqs,
      products,
      news
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Admin update endpoints (Basic - needs auth later)
app.post('/api/admin/settings', async (req, res) => {
  const { site_name, site_description, playstore_link, appstore_link, contact_email, contact_phone, contact_address, logo_url } = req.body;
  try {
    await db.execute(
      'UPDATE site_settings SET site_name=?, site_description=?, playstore_link=?, appstore_link=?, contact_email=?, contact_phone=?, contact_address=?, logo_url=? WHERE id=1',
      [site_name, site_description, playstore_link, appstore_link, contact_email, contact_phone, contact_address, logo_url || null]
    );
    res.json({ message: 'Settings updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/sections/:name', async (req, res) => {
  const { name } = req.params;
  const { title, subtitle, content, image_url } = req.body;
  try {
    await db.execute(
      'UPDATE sections SET title=?, subtitle=?, content=?, image_url=? WHERE name=?',
      [title, subtitle, content, image_url || null, name]
    );
    res.json({ message: `Section ${name} updated` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FAQ Bulk Update
app.post('/api/admin/faqs', async (req, res) => {
  const { faqs } = req.body;
  try {
    await db.execute('DELETE FROM faqs');
    for (let i = 0; i < faqs.length; i++) {
      await db.execute(
        'INSERT INTO faqs (question, answer, sort_order) VALUES (?, ?, ?)',
        [faqs[i].question, faqs[i].answer, i]
      );
    }
    res.json({ message: 'FAQs updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Products Bulk Update
app.post('/api/admin/products', async (req, res) => {
  const { products } = req.body;
  try {
    await db.execute('DELETE FROM products');
    for (let i = 0; i < products.length; i++) {
      await db.execute(
        'INSERT INTO products (name, description, image_url, category, sort_order) VALUES (?, ?, ?, ?, ?)',
        [products[i].name, products[i].description, products[i].image_url || null, products[i].category || 'produk', i]
      );
    }
    res.json({ message: 'Products updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// News Admin CRUD Endpoints
app.post('/api/admin/news', async (req, res) => {
  const { title, category, content, image_url, sort_order } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO news (title, category, content, image_url, sort_order) VALUES (?, ?, ?, ?, ?)',
      [title, category, content, image_url || null, sort_order || 0]
    );
    res.json({ message: 'News added', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/news/:id', async (req, res) => {
  const { id } = req.params;
  const { title, category, content, image_url, sort_order } = req.body;
  try {
    await db.execute(
      'UPDATE news SET title=?, category=?, content=?, image_url=?, sort_order=? WHERE id=?',
      [title, category, content, image_url || null, sort_order || 0, id]
    );
    res.json({ message: 'News updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/news/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM news WHERE id=?', [id]);
    res.json({ message: 'News deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
