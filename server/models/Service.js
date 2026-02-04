const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a service name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: 0,
    },
    duration: {
      type: Number,
      required: [true, 'Please add duration in minutes'],
      min: 1,
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: [
        'Home Services',
        'Beauty Care',
        'Auto Services',
        'Health',
        'Education',
        'Delivery',
        'Tech Services',
        'Events'
      ],
      default: 'Home Services'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Service', serviceSchema);