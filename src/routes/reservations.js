const pool = require('../config/databaseConfig');

function addZero(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

const addNewReservation = async (req, res) => {
  try {
    let reservations_all = await pool.query('SELECT * FROM reservation');
    let reservations = reservations_all.rows;

    reservations.forEach((reservation) => {
      let startDate = new Date(reservation.reservation_start);
      let date = addZero(startDate.getUTCDate());
      let month = addZero(startDate.getUTCMonth() + 1);
      let year = startDate.getUTCFullYear();
      let newDate = year + '-' + month + '-' + date;

      let h = addZero(startDate.getHours());
      let m = addZero(startDate.getMinutes());
      let s = addZero(startDate.getSeconds());
      let reservationStart = h + ':' + m + ':' + s;

      let dateConcat = newDate + ' ' + reservationStart;
      console.log(dateConcat);
      console.log(reservation);

      // if (reservation.reservation_start === dateConcat) {
      //   throw new Error('Nope');
      // }

      // let exists = Object.values(reservation).includes(reservation.reservation_start);
      // if (exists) {
      //   throw new Error('cant add');
      // }

      let hasValue = Object.values(reservation).includes('2021-09-05 09:01:00');
      console.log(hasValue);

      // Object.keys(reservation).forEach(function (key) {
      //   if (reservation[key] === dateConcat) {
      //     throw new Error('Nope');
      //   }
      // });
    });

    const newReservation = await pool.query(
      'INSERT INTO reservation (reservation_start, reservation_end, reservation_name, serviceID, clientID) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [
        req.body.reservation_start,
        req.body.reservation_end,
        req.body.reservation_name,
        req.body.serviceID,
        req.body.clientID,
      ]
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
