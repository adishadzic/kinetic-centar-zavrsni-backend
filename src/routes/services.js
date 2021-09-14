const pool = require('../config/databaseConfig');

const addNewService = async (req, res) => {
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
};

const getAllServices = async (req, res) => {
  try {
    const allServices = await pool.query('SELECT * FROM service');
    res.json(allServices.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await pool.query('SELECT * FROM service WHERE service_id=$1', [id]);
    res.json(service.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.service_description) {
      await pool.query('UPDATE service SET service_description = $1 WHERE service_id = $2', [
        req.body.service_description,
        id,
      ]);
    }
    if (req.body.service_name) {
      await pool.query('UPDATE service SET service_name = $1 WHERE service_id = $2', [
        req.body.service_name,
        id,
      ]);
    }

    if (req.body.service_duration) {
      await pool.query('UPDATE service SET service_duration = $1 WHERE service_id = $2', [
        req.body.service_duration,
        id,
      ]);
    }

    if (req.body.service_price) {
      await pool.query('UPDATE service SET service_price = $1 WHERE service_id = $2', [
        req.body.service_price,
        id,
      ]);
    }

    res.json('Service was updated!');
  } catch (err) {
    console.error(err.message);
  }
};

const removeService = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM service WHERE service_id=$1', [id]);

    res.json('Service was removed from the database!');
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { addNewService, getAllServices, getServiceById, updateService, removeService };
