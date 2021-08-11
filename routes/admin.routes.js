const express = require('express');
const router = express.Router();
const pool = require('../database_pool');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Signup logic
router.post('/register', async (req, res, next) => {
  try {
    const { admin_first_name, admin_last_name, admin_email, admin_password, admin_profile_picture } =
      req.body;
    const hashedPassword = await bcrypt.hash(admin_password, 10);
    const validEmail = typeof admin_email == 'string' && admin_email.trim() != '';
    const validPassword =
      typeof admin_password == 'string' && admin_password.trim() != '' && admin_password.trim().length >= 6;

    if (validEmail && validPassword) {
      const newAdmin = await pool.query(
        'INSERT INTO admin (admin_first_name, admin_last_name, admin_email, admin_password, admin_profile_picture) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [admin_first_name, admin_last_name, admin_email, hashedPassword, admin_profile_picture]
      );
      res.json(newAdmin.rows[0]);
      res.redirect('/admin/login');
    } else {
      res.status(404).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

// Login logic
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
  } catch (error) {}
});

module.exports = router;
