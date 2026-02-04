const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    date: {
      type: Date,
      required: [true, 'Please add a booking date'],
    },
    time: {
      type: String,
      required: [true, 'Please add a booking time'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Completed', 'Cancelled', 'Missed'],
      default: 'Pending',
    },
    notes: {
      type: String,
      default: '',
    },
    completedBy: {
      type: String,
      enum: ['user', 'admin', 'auto'],
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual to check if booking is overdue
bookingSchema.virtual('isOverdue').get(function() {
  if (this.status === 'Pending' || this.status === 'Approved') {
    const bookingDateTime = new Date(this.date);
    const [hours, minutes] = this.time.split(':');
    bookingDateTime.setHours(parseInt(hours), parseInt(minutes));
    
    return new Date() > bookingDateTime;
  }
  return false;
});

// Ensure virtuals are included in JSON
bookingSchema.set('toJSON', { virtuals: true });
bookingSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Booking', bookingSchema);