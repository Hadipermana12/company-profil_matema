const express = require('express');
const router = express.Router();
const contentController = require('../controllers/content.controller');

router.get('/content', contentController.getLandingPageContent);

module.exports = router;
