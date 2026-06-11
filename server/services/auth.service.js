const db = require('../config/db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'kmma_secret_key_2024';

const authenticateUser = async (username, password) => {
  const [users] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  if (users.length === 0) {
    throw new Error('Invalid credentials');
  }

  const user = users[0];
  const isMatch = password === user.password;
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
  return {
    token,
    user: { id: user.id, username: user.username, name: user.name }
  };
};

module.exports = {
  authenticateUser
};
