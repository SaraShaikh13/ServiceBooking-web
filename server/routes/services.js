const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');

router.route('/').get(getAllServices).post(protect, adminAuth, createService);

router
  .route('/:id')
  .get(getServiceById)
  .put(protect, adminAuth, updateService)
  .delete(protect, adminAuth, deleteService);

module.exports = router;