const db = require('../config/db');

const updateSettings = async (settings) => {
  const { 
    site_name, 
    site_description, 
    playstore_link, 
    appstore_link, 
    contact_email, 
    contact_phone, 
    contact_address, 
    logo_url 
  } = settings;

  await db.execute(
    'UPDATE site_settings SET site_name=?, site_description=?, playstore_link=?, appstore_link=?, contact_email=?, contact_phone=?, contact_address=?, logo_url=? WHERE id=1',
    [
      site_name, 
      site_description, 
      playstore_link, 
      appstore_link || null, 
      contact_email, 
      contact_phone, 
      contact_address, 
      logo_url || null
    ]
  );
};

const updateSection = async (name, section) => {
  const { title, subtitle, content, image_url } = section;
  await db.execute(
    'UPDATE sections SET title=?, subtitle=?, content=?, image_url=? WHERE name=?',
    [title, subtitle, content, image_url || null, name]
  );
};

const updateFAQs = async (faqs) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM faqs');
    for (let i = 0; i < faqs.length; i++) {
      await connection.execute(
        'INSERT INTO faqs (question, answer, sort_order) VALUES (?, ?, ?)',
        [faqs[i].question, faqs[i].answer, i]
      );
    }
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

const updateProducts = async (products) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM products');
    for (let i = 0; i < products.length; i++) {
      await connection.execute(
        'INSERT INTO products (name, description, image_url, category, sort_order) VALUES (?, ?, ?, ?, ?)',
        [
          products[i].name, 
          products[i].description, 
          products[i].image_url || null, 
          products[i].category || 'produk', 
          i
        ]
      );
    }
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

const createNews = async (news) => {
  const { title, category, content, image_url, sort_order } = news;
  const [result] = await db.execute(
    'INSERT INTO news (title, category, content, image_url, sort_order) VALUES (?, ?, ?, ?, ?)',
    [title, category, content, image_url || null, sort_order || 0]
  );
  return result.insertId;
};

const updateNews = async (id, news) => {
  const { title, category, content, image_url, sort_order } = news;
  await db.execute(
    'UPDATE news SET title=?, category=?, content=?, image_url=?, sort_order=? WHERE id=?',
    [title, category, content, image_url || null, sort_order || 0, id]
  );
};

const deleteNews = async (id) => {
  await db.execute('DELETE FROM news WHERE id=?', [id]);
};

module.exports = {
  updateSettings,
  updateSection,
  updateFAQs,
  updateProducts,
  createNews,
  updateNews,
  deleteNews
};
