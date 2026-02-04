console.log('=== Starting Server ===');

const express = require('express');
console.log('✓ Express loaded');

const dotenv = require('dotenv');
console.log('✓ Dotenv loaded');

const cors = require('cors');
console.log('✓ CORS loaded');

// Load env vars
dotenv.config();
console.log('✓ Environment variables loaded');
console.log('PORT:', process.env.PORT);
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);

const connectDB = require('./config/db');
console.log('✓ connectDB loaded');

const { errorHandler } = require('./middleware/errorHandler');
console.log('✓ errorHandler loaded');

// Connect to database
console.log('Attempting to connect to database...');
connectDB();

const app = express();
console.log('✓ Express app created');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log('✓ Middleware configured');

// Routes
console.log('Loading routes...');
app.use('/api/auth', require('./routes/auth'));
console.log('✓ Auth routes loaded');

app.use('/api/services', require('./routes/services'));
console.log('✓ Service routes loaded');

app.use('/api/bookings', require('./routes/bookings'));
console.log('✓ Booking routes loaded');

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Service Booking API is running' });
});

// Error handler
app.use(errorHandler);

const checkMissedBookings = require('./utils/checkMissedBookings');

// Check for missed bookings every 5 minutes
setInterval(async () => {
  await checkMissedBookings();
}, 5 * 60 * 1000); // 5 minutes

// Also check on server start
checkMissedBookings();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✓ Server is running on port ${PORT}`);
  console.log(`✓ Visit: http://localhost:${PORT}`);
});

console.log('=== Server setup complete ===');

app.use('/api/users', require('./routes/users'));