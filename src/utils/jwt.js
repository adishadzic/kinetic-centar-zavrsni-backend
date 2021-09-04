const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtSigner(admin_id) {
  const payload = {
    admin: admin_id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET_TOKEN, { expiresIn: '12hr' });
}

module.exports = jwtSigner;
