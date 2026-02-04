const Booking = require('../models/Booking');

const checkMissedBookings = async () => {
  try {
    const now = new Date();
    
    // Find all pending or approved bookings
    const bookings = await Booking.find({
      status: { $in: ['Pending', 'Approved'] }
    });
    
    let missedCount = 0;
    
    for (const booking of bookings) {
      const bookingDateTime = new Date(booking.date);
      const [hours, minutes] = booking.time.split(':');
      bookingDateTime.setHours(parseInt(hours), parseInt(minutes));
      
      // If booking time has passed, mark as missed
      if (now > bookingDateTime) {
        booking.status = 'Missed';
        await booking.save();
        missedCount++;
      }
    }
    
    if (missedCount > 0) {
      console.log(`✓ Marked ${missedCount} booking(s) as missed`);
    }
  } catch (error) {
    console.error('Error checking missed bookings:', error);
  }
};

module.exports = checkMissedBookings;