const express = require('express');
const path = require('path');
const cors = require('./config/cors');
const apiRouter = require('./routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middlewares
app.use(cors);
app.use(express.json());

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Main API Routes
app.use('/api', apiRouter);

// Root route
app.get('/', (req, res) => {
  res.send('KMMA API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
