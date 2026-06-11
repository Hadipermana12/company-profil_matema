const authService = require('../services/auth.service');

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    const result = await authService.authenticateUser(username, password);
    return res.json(result);
  } catch (err) {
    if (err.message === 'Invalid credentials') {
      return res.status(401).json({ message: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  login
};
