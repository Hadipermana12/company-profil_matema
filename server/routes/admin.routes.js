const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const upload = require('../middlewares/upload.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

// Protect all admin routes with authMiddleware
router.use(authMiddleware);

// Upload endpoint
router.post('/upload', upload.single('image'), adminController.uploadImage);

// Settings
router.post('/settings', adminController.updateSettings);

// Sections
router.post('/sections/:name', adminController.updateSection);

// FAQs Bulk Update
router.post('/faqs', adminController.updateFAQs);

// Products Bulk Update
router.post('/products', adminController.updateProducts);

// News CRUD
router.post('/news', adminController.createNews);
router.put('/news/:id', adminController.updateNews);
router.delete('/news/:id', adminController.deleteNews);

module.exports = router;
