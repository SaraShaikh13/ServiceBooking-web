const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');

dotenv.config();

const services = [
  // 🏠 Home Services
  {
    name: 'Electrician',
    category: 'Home Services',
    description: 'Professional electrical installation, repair, and maintenance services for your home.',
    price: 50,
    duration: 60
  },
  {
    name: 'Plumber',
    category: 'Home Services',
    description: 'Expert plumbing services including pipe repair, installation, and emergency fixes.',
    price: 45,
    duration: 60
  },
  {
    name: 'AC / Refrigerator Repair',
    category: 'Home Services',
    description: 'Professional AC and refrigerator repair and maintenance services.',
    price: 60,
    duration: 90
  },
  {
    name: 'House Cleaning',
    category: 'Home Services',
    description: 'Complete house cleaning services including deep cleaning and regular maintenance.',
    price: 40,
    duration: 120
  },
  {
    name: 'Pest Control',
    category: 'Home Services',
    description: 'Safe and effective pest control solutions for your home.',
    price: 55,
    duration: 90
  },
  {
    name: 'Carpenter',
    category: 'Home Services',
    description: 'Skilled carpentry services for furniture repair, installation, and custom woodwork.',
    price: 50,
    duration: 120
  },
  {
    name: 'Painting Services',
    category: 'Home Services',
    description: 'Professional interior and exterior painting services for your home.',
    price: 80,
    duration: 240
  },

  // 💇‍♀️ Beauty Care
  {
    name: 'Salon at Home (Haircut, Facial, Makeup)',
    category: 'Beauty Care',
    description: 'Complete salon services at your doorstep including haircut, facial, and makeup.',
    price: 70,
    duration: 120
  },
  {
    name: 'Mehndi / Bridal Services',
    category: 'Beauty Care',
    description: 'Traditional and bridal mehndi application services.',
    price: 50,
    duration: 90
  },
  {
    name: 'Massage / Spa',
    category: 'Beauty Care',
    description: 'Relaxing massage and spa services at your home.',
    price: 65,
    duration: 90
  },
  {
    name: 'Fitness Trainer / Yoga Instructor',
    category: 'Beauty Care',
    description: 'Personal fitness training and yoga instruction at your convenience.',
    price: 40,
    duration: 60
  },

  // 🚗 Auto Services
  {
    name: 'Car Wash',
    category: 'Auto Services',
    description: 'Complete car washing and detailing services.',
    price: 25,
    duration: 45
  },
  {
    name: 'Bike / Car Repair',
    category: 'Auto Services',
    description: 'Professional bike and car repair and maintenance services.',
    price: 100,
    duration: 120
  },
  {
    name: 'Towing Service',
    category: 'Auto Services',
    description: 'Emergency towing services available 24/7.',
    price: 75,
    duration: 60
  },
  {
    name: 'Oil Change',
    category: 'Auto Services',
    description: 'Quick and professional oil change service for your vehicle.',
    price: 30,
    duration: 30
  },

  // 🏥 Health
  {
    name: 'Doctor Appointment',
    category: 'Health',
    description: 'Book appointments with qualified doctors for consultation.',
    price: 50,
    duration: 30
  },
  {
    name: 'Nurse at Home',
    category: 'Health',
    description: 'Professional nursing care at your home.',
    price: 60,
    duration: 120
  },
  {
    name: 'Lab Test Booking',
    category: 'Health',
    description: 'Book lab tests with home sample collection facility.',
    price: 40,
    duration: 30
  },
  {
    name: 'Physiotherapy',
    category: 'Health',
    description: 'Professional physiotherapy services at your home.',
    price: 55,
    duration: 60
  },
  {
    name: 'Elder Care',
    category: 'Health',
    description: 'Compassionate elder care and assistance services.',
    price: 70,
    duration: 240
  },

  // 📚 Education
  {
    name: 'Home Tutors',
    category: 'Education',
    description: 'Qualified home tutors for all subjects and grades.',
    price: 35,
    duration: 60
  },
  {
    name: 'Online Tutors',
    category: 'Education',
    description: 'Expert online tutoring for flexible learning.',
    price: 30,
    duration: 60
  },
  {
    name: 'Language Teachers',
    category: 'Education',
    description: 'Professional language instruction for all ages.',
    price: 40,
    duration: 60
  },
  {
    name: 'Career Counseling',
    category: 'Education',
    description: 'Expert career guidance and counseling services.',
    price: 50,
    duration: 90
  },

  // 📦 Delivery
  {
    name: 'Grocery Delivery',
    category: 'Delivery',
    description: 'Fast and reliable grocery delivery to your doorstep.',
    price: 15,
    duration: 60
  },
  {
    name: 'Pharmacy Delivery',
    category: 'Delivery',
    description: 'Quick medicine and pharmacy product delivery.',
    price: 10,
    duration: 30
  },
  {
    name: 'Document / Parcel Pickup & Drop',
    category: 'Delivery',
    description: 'Reliable document and parcel pickup and delivery service.',
    price: 20,
    duration: 45
  },
  {
    name: 'Personal Shopper',
    category: 'Delivery',
    description: 'Personal shopping assistance and delivery service.',
    price: 25,
    duration: 90
  },

  // 🛠️ Tech Services
  {
    name: 'Mobile Repair',
    category: 'Tech Services',
    description: 'Expert mobile phone repair and maintenance services.',
    price: 40,
    duration: 60
  },
  {
    name: 'Laptop Repair',
    category: 'Tech Services',
    description: 'Professional laptop repair and troubleshooting services.',
    price: 60,
    duration: 90
  },
  {
    name: 'CCTV Installation',
    category: 'Tech Services',
    description: 'Professional CCTV camera installation and setup.',
    price: 100,
    duration: 180
  },
  {
    name: 'Website / App Development',
    category: 'Tech Services',
    description: 'Custom website and mobile app development services.',
    price: 500,
    duration: 480
  },
  {
    name: 'IT Support',
    category: 'Tech Services',
    description: 'Technical support and IT troubleshooting services.',
    price: 50,
    duration: 60
  },

  // 🎉 Events
  {
    name: 'Event Planners',
    category: 'Events',
    description: 'Complete event planning and management services.',
    price: 200,
    duration: 480
  },
  {
    name: 'Photographers',
    category: 'Events',
    description: 'Professional photography services for all occasions.',
    price: 150,
    duration: 240
  },
  {
    name: 'Caterers',
    category: 'Events',
    description: 'Catering services for events and parties.',
    price: 300,
    duration: 360
  },
  {
    name: 'Decorators',
    category: 'Events',
    description: 'Professional decoration services for events.',
    price: 180,
    duration: 240
  }
];

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ MongoDB Connected');

    // Clear existing services
    await Service.deleteMany({});
    console.log('✓ Cleared existing services');

    // Insert all services
    await Service.insertMany(services);
    console.log(`✓ ${services.length} services added successfully!`);

    console.log('\n📊 Services by Category:');
    console.log('🏠 Home Services: 7');
    console.log('💇‍♀️ Beauty Care: 4');
    console.log('🚗 Auto Services: 4');
    console.log('🏥 Health: 5');
    console.log('📚 Education: 4');
    console.log('📦 Delivery: 4');
    console.log('🛠️ Tech Services: 5');
    console.log('🎉 Events: 4');
    console.log(`\n✅ Total: ${services.length} services`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedServices();