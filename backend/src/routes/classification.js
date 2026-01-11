const express = require('express');
const router = express.Router();
const classificationController = require('../controllers/classificationController');
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');

// POST /api/classification/analyze - Analyze uploaded image
router.post(
  '/analyze',
  authenticate,
  upload.single('image'),
  classificationController.analyzeImage
);

// POST /api/classification/validate - Validate user corrections
router.post(
  '/validate',
  authenticate,
  classificationController.validateCorrections
);

module.exports = router;