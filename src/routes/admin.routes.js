const express = require('express');
const router = express.Router();
const pool = require('../config/databaseConfig');
const bcrypt = require('bcryptjs');
const jwtSigner = require('../utils/jwt');
const validCreds = require('../middleware/validCreds');

router.post('/register', validCreds, async (req, res, next) => {
  try {
    const { admin_first_name, admin_last_name, admin_email, admin_password, admin_profile_picture } =
      req.body;
    const hashedPassword = await bcrypt.hash(admin_password, 10);

    const newAdmin = await pool.query(
      'INSERT INTO admin (admin_first_name, admin_last_name, admin_email, admin_password, admin_profile_picture) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [admin_first_name, admin_last_name, admin_email, hashedPassword, admin_profile_picture]
    );

    const token = jwtSigner(newAdmin.rows[0].admin_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
  }
});

router.post('/login', validCreds, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await pool.query('SELECT * FROM admin WHERE admin_email = $1', [email]);

    if (admin.rows.length === 0) {
      return res.status(401).json('Pass or email incorrect');
    }

    const validPassword = await bcrypt.compare(password, admin.rows[0].admin_password);

    if (!validPassword) {
      return res.status(401).json('Password dont match bro');
    }

    const token = jwtSigner(admin.rows[0].admin_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
  }
});

router.get('/admins', async (req, res) => {
  try {
    const allAdmins = await pool.query('SELECT * FROM admin');
    res.json(allAdmins.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
