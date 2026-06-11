const contentService = require('../services/content.service');

const getLandingPageContent = async (req, res) => {
  try {
    const data = await contentService.getLandingPageContent();
    return res.json(data);
  } catch (err) {
    console.error('Error fetching content:', err);
    return res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  getLandingPageContent
};
