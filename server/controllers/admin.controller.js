const adminService = require('../services/admin.service');

const uploadImage = (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  return res.json({ imageUrl });
};

const updateSettings = async (req, res) => {
  try {
    await adminService.updateSettings(req.body);
    return res.json({ message: 'Settings updated' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateSection = async (req, res) => {
  const { name } = req.params;
  try {
    await adminService.updateSection(name, req.body);
    return res.json({ message: `Section ${name} updated` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateFAQs = async (req, res) => {
  const { faqs } = req.body;
  try {
    await adminService.updateFAQs(faqs || []);
    return res.json({ message: 'FAQs updated' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateProducts = async (req, res) => {
  const { products } = req.body;
  try {
    await adminService.updateProducts(products || []);
    return res.json({ message: 'Products updated' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const createNews = async (req, res) => {
  try {
    const insertId = await adminService.createNews(req.body);
    return res.json({ message: 'News added', id: insertId });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateNews = async (req, res) => {
  const { id } = req.params;
  try {
    await adminService.updateNews(id, req.body);
    return res.json({ message: 'News updated' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteNews = async (req, res) => {
  const { id } = req.params;
  try {
    await adminService.deleteNews(id);
    return res.json({ message: 'News deleted' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  uploadImage,
  updateSettings,
  updateSection,
  updateFAQs,
  updateProducts,
  createNews,
  updateNews,
  deleteNews
};
