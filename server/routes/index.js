const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const contentRoutes = require('./content.routes');
const adminRoutes = require('./admin.routes');

// Mount child routes under main /api router
router.use('/', authRoutes);
router.use('/', contentRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
