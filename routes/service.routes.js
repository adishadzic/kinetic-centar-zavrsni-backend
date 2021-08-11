const express = require('express');
const router = express.Router();
const pool = require('../database_pool');
const cors = require('cors');

/* Add a new service */
router.post('/services', async (req, res) => {
  try {
    const { service_id, service_name, service_description, service_duration, service_price } = req.body;
    const newService = await pool.query(
      'INSERT INTO service (service_id, service_name, service_description, service_duration, service_price) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [service_id, service_name, service_description, service_duration, service_price]
    );

    res.json(newService.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

/* Get all services*/
router.get('/services', async (req, res) => {
  try {
    const allServices = await pool.query('SELECT * FROM service');
    res.json(allServices.rows);
  } catch (err) {
    console.error(err.message);
  }
});

/* Get one service */
router.get('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const service = await pool.query('SELECT * FROM service WHERE service_id=$1', [id]);
    res.json(service.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

/* Update a service */
router.put('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { service_description } = req.body;
    const updateService = await pool.query(
      'UPDATE service SET service_description = $1 WHERE service_id = $2',
      [service_description, id]
    );

    res.json('Service was updated!');
  } catch (err) {
    console.error(err.message);
  }
});

/* Delete a service */
router.delete('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteService = await pool.query('DELETE FROM service WHERE service_id=$1', [id]);

    res.json('Service was removed from the database!');
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
