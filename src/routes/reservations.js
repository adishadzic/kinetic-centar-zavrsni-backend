const pool = require('../config/databaseConfig');
const { validateReservationRange } = require('../helper');

// function addZero(i) {
//   if (i < 10) {
//     i = '0' + i;
//   }
//   return i;
// }

const addNewReservation = async (req, res) => {
  try {
    let reservations_all = await pool.query('SELECT * FROM reservation');
    let reservations = reservations_all.rows;

    console.log(reservations);

    const isValid = validateReservationRange(reservations, req.body.startDate, req.body.endDate);
    if (!isValid) return res.status(400).json({ message: 'Invalid reservation range' });

    const newReservation = await pool.query(
      'INSERT INTO reservation (startDate, endDate, title, serviceID, clientID) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [req.body.startDate, req.body.endDate, req.body.title, req.body.serviceID, req.body.clientID]
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

    const isValid = validateReservationRange(reservations, req.body.startDate, req.body.endDate, id);
    if (!isValid) return res.status(400).json({ message: 'Invalid reservation range' });

    if (req.body.startDate && req.body.endDate) {
      await pool.query('UPDATE reservation SET startDate = $1,endDate = $2 WHERE reservation_id = $3', [
        req.body.startDate,
        req.body.endDate,
        id,
      ]);
    }

    if (req.body.title) {
      await pool.query('UPDATE reservation SET title = $1 WHERE reservation_id = $2', [req.body.title, id]);
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
