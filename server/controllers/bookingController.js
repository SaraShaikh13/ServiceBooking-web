const Booking = require('../models/Booking');

// Helper function to check and mark missed bookings
const checkAndMarkMissedBookings = async () => {
  try {
    const now = new Date();
    
    const bookings = await Booking.find({
      status: { $in: ['Pending', 'Approved'] }
    });
    
    for (const booking of bookings) {
      const bookingDateTime = new Date(booking.date);
      const [hours, minutes] = booking.time.split(':');
      bookingDateTime.setHours(parseInt(hours), parseInt(minutes));
      
      if (now > bookingDateTime) {
        booking.status = 'Missed';
        await booking.save();
      }
    }
  } catch (error) {
    console.error('Error checking missed bookings:', error);
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { serviceId, date, time, notes } = req.body;

    const booking = await Booking.create({
      userId: req.user._id,
      serviceId,
      date,
      time,
      notes,
      status: 'Pending', // Explicitly set to Pending
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('userId', 'name email')
      .populate('serviceId', 'name price duration');

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/user
// @access  Private
const getUserBookings = async (req, res) => {
  try {
    await checkAndMarkMissedBookings();
    
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('serviceId', 'name price duration')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings/admin
// @access  Private/Admin
const getAllBookings = async (req, res) => {
  try {
    await checkAndMarkMissedBookings();
    
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('serviceId', 'name price duration')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      booking.status = req.body.status || booking.status;
      
      if (req.body.status === 'Completed') {
        booking.completedBy = 'admin';
        booking.completedAt = new Date();
      }

      const updatedBooking = await booking.save();
      const populatedBooking = await Booking.findById(updatedBooking._id)
        .populate('userId', 'name email')
        .populate('serviceId', 'name price duration');

      res.json(populatedBooking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark booking as completed by user
// @route   PUT /api/bookings/:id/complete
// @access  Private
const markAsCompleted = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Check if booking time has passed
    const bookingDateTime = new Date(booking.date);
    const [hours, minutes] = booking.time.split(':');
    bookingDateTime.setHours(parseInt(hours), parseInt(minutes));
    
    if (new Date() < bookingDateTime) {
      return res.status(400).json({ message: 'Cannot complete booking before scheduled time' });
    }

    booking.status = 'Completed';
    booking.completedBy = 'user';
    booking.completedAt = new Date();

    const updatedBooking = await booking.save();
    const populatedBooking = await Booking.findById(updatedBooking._id)
      .populate('userId', 'name email')
      .populate('serviceId', 'name price duration');

    res.json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      // Check if user owns this booking or is admin
      if (
        booking.userId.toString() === req.user._id.toString() ||
        req.user.role === 'admin'
      ) {
        await booking.deleteOne();
        res.json({ message: 'Booking removed' });
      } else {
        res.status(403).json({ message: 'Not authorized' });
      }
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get booking stats
// @route   GET /api/bookings/stats
// @access  Private/Admin
const getBookingStats = async (req, res) => {
  try {
    await checkAndMarkMissedBookings();
    
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'Pending' });
    const completedBookings = await Booking.countDocuments({ status: 'Completed' });
    const missedBookings = await Booking.countDocuments({ status: 'Missed' });
    
    res.json({
      totalBookings,
      pendingBookings,
      completedBookings,
      missedBookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
  markAsCompleted,
  getBookingStats,
};