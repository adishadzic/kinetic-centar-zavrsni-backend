const express = require('express');
const router = express.Router();
const pool = require('../config/databaseConfig');
const bcrypt = require('bcryptjs');
const jwtSigner = require('../utils/jwt');
const validCreds = require('../middleware/validCreds');

router.post('/login', validCreds, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await pool.query('SELECT * FROM admin WHERE admin_email = $1', [email]);

    if (admin.rows.length === 0) {
      return res.status(401).json('Password or email incorrect');
    }

    const validPassword = await bcrypt.compare(password, admin.rows[0].admin_password);

    if (!validPassword) {
      return res.status(401).json('Password or email incorrect');
    }

    const token = jwtSigner(admin.rows[0].admin_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const allAdmins = await pool.query('SELECT * FROM admin');
    res.json(allAdmins.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
