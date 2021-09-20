const pool = require('../config/databaseConfig');

const addNewReservation = async (req, res) => {
  try {
    const { reservation_date, reservation_time, reservation_name, serviceID, clientID } = req.body;
    const newReservation = await pool.query(
      'INSERT INTO reservation (reservation_date, reservation_time, reservation_name, serviceID, clientID) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [reservation_date, reservation_time, reservation_name, serviceID, clientID]
    );

    res.json(newReservation.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.json("Service or client doesn't exist");
  }
};

const getAllReservations = async (req, res) => {
  try {
    const allReservations = await pool.query('SELECT * FROM reservation');
    res.json(allReservations.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await pool.query('SELECT * FROM reservation WHERE reservation_id=$1', [id]);
    res.json(reservation.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
};

const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.reservation_date) {
      await pool.query('UPDATE reservation SET reservation_date = $1 WHERE reservation_id = $2', [
        req.body.reservation_date,
        id,
      ]);
    }

    if (req.body.reservation_name) {
      await pool.query('UPDATE reservation SET reservation_name = $1 WHERE reservation_id = $2', [
        req.body.reservation_name,
        id,
      ]);
    }

    res.json('Reservation was updated!');
  } catch (err) {
    console.error(err.message);
  }
};

const removeReservation = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM reservation WHERE reservation_id=$1', [id]);

    res.json('Reservation was removed from the database!');
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  addNewReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  removeReservation,
};
