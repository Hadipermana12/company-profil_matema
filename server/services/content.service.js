const db = require('../config/db');

const getLandingPageContent = async () => {
  const [settings] = await db.execute('SELECT * FROM site_settings WHERE id = 1');
  const [sections] = await db.execute('SELECT * FROM sections');
  const [faqs] = await db.execute('SELECT * FROM faqs ORDER BY sort_order');
  const [products] = await db.execute('SELECT * FROM products ORDER BY sort_order');
  const [news] = await db.execute('SELECT * FROM news ORDER BY sort_order ASC, created_at DESC');

  return {
    settings: settings[0],
    sections: sections.reduce((acc, s) => ({ ...acc, [s.name]: s }), {}),
    faqs,
    products,
    news
  };
};

module.exports = {
  getLandingPageContent
};
