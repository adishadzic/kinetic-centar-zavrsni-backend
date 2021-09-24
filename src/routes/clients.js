const pool = require('../config/databaseConfig');
const { clienEmailValidation } = require('../utils/validation');

const addNewClient = async (req, res) => {
  const { error } = clienEmailValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const {
      client_first_name,
      client_last_name,
      client_email,
      client_phone_number,
      client_birth_date,
      client_sex,
    } = req.body;
    const newClient = await pool.query(
      'INSERT INTO client (client_first_name, client_last_name, client_email, client_phone_number, client_birth_date, client_sex) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      [client_first_name, client_last_name, client_email, client_phone_number, client_birth_date, client_sex]
    );

    res.json({ Success: newClient.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.json({ error: err.message });
  }
};

const getAllClients = async (req, res) => {
  try {
    const allClients = await pool.query('SELECT * FROM client');
    res.json(allClients.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.query('SELECT * FROM client WHERE client_id = $1', [id]);
    res.json(client.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const updateClientInfo = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.body.client_email) {
      await pool.query('UPDATE client SET client_email = $1 WHERE client_id = $2', [
        req.body.client_email,
        id,
      ]);
    }

    if (req.body.client_phone_number) {
      await pool.query('UPDATE client SET client_phone_number = $1 WHERE client_id = $2', [
        req.body.client_phone_number,
        id,
      ]);
    }

    res.json('Client`s info was updated!');
  } catch (err) {
    console.error(err.message);
  }
};

const removeClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteClient = await pool.query('DELETE FROM client WHERE client_id = $1', [id]);

    res.json('Client was removed from the database!');
  } catch (err) {
    console.error(err.message);
    res.json('Error');
  }
};

const clientSearch = async (req, res) => {
  try {
    const { name } = req.query;

    const clients = await pool.query(
      "SELECT * FROM client WHERE client_first_name || ' ' || client_last_name ILIKE $1",
      [`%${name}%`]
    );

    res.json(clients.rows);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { addNewClient, getAllClients, getClientById, updateClientInfo, removeClient, clientSearch };
