const express = require('express');
const router = express.Router();
const pool = require('../database_pool');
const cors = require('cors');

/* Add a new client */
router.post('/clients', async (req, res) => {
  try {
    const {
      client_first_name,
      client_last_name,
      client_email,
      client_age,
      client_profile_picture,
      client_phone_number,
      client_birth_date,
      client_sex,
    } = req.body;
    const newClient = await pool.query(
      'INSERT INTO client (client_first_name, client_last_name, client_email, client_age, client_profile_picture, client_phone_number, client_birth_date, client_sex) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        client_first_name,
        client_last_name,
        client_email,
        client_age,
        client_profile_picture,
        client_phone_number,
        client_birth_date,
        client_sex,
      ]
    );

    res.json(newClient.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

/* Get all clients */
router.get('/clients', async (req, res) => {
  try {
    const allClients = await pool.query('SELECT * FROM client');
    res.json(allClients.rows);
  } catch (err) {
    console.error(err.message);
  }
});

/* Get one client */
router.get('/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.query('SELECT * FROM client WHERE client_id = $1', [id]);
    res.json(client.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

/* Update client's info */

/* Remove a client */
router.delete('/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteClient = await pool.query('DELETE FROM client WHERE client_id = $1', [id]);

    res.json('Client was removed from the database!');
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
