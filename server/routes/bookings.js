const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
  markAsCompleted,
  getBookingStats,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');

router.route('/').post(protect, createBooking);

router.route('/user').get(protect, getUserBookings);

router.route('/admin').get(protect, adminAuth, getAllBookings);

router.route('/stats').get(protect, adminAuth, getBookingStats);

router.route('/:id/status').put(protect, adminAuth, updateBookingStatus);

router.route('/:id/complete').put(protect, markAsCompleted);

router.route('/:id').delete(protect, deleteBooking);

const Report = require('../models/Report');

// Add this route
router.post('/report', protect, async (req, res) => {
  try {
    const { bookingId, reason, description } = req.body;

    const report = await Report.create({
      bookingId,
      userId: req.user._id,
      reason,
      description,
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;