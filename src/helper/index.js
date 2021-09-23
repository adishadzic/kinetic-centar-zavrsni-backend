const validateReservationRange = (reservations, newStartTime, newEndTime, reservationId) => {
  if (reservations && reservations.length == 0) return true;
  for (const reservation of reservations) {
    if (reservation.reservation_id == reservationId) continue;
    if (!(newStartTime >= reservation.endDate || newEndTime <= reservation.startDate)) return false;
  }
  return true;
};

module.exports = { validateReservationRange };
