const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenAuthenticated = async (req, res, next) => {
  try {
    const jwtToken = req.header('token');

    if (!jwtToken) {
      return res.status(403).send('Unauthorized');
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET_TOKEN);

    req.admin = payload.admin;
  } catch (err) {
    console.error(err.message);
    return res.status(403).json('Unauthorized');
  }
};

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']; //Bearer TOKEN
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token == null) return res.status(401).json({ error: 'Null token' });
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
//     if (error) return res.status(403).json({ error: error.message });
//     req.user = user;
//     next();
//   });
// }

module.exports = tokenAuthenticated;
