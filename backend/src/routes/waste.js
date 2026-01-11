const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const { authenticate } = require('../middleware/auth');

// POST /api/waste/listings - Create new listing
router.post('/listings', authenticate, listingController.createListing);

// GET /api/waste/listings - Get all listings with filters
router.get('/listings', listingController.getListings);

// GET /api/waste/listings/:id - Get single listing
router.get('/listings/:id', listingController.getListingById);

// PUT /api/waste/listings/:id - Update listing
router.put('/listings/:id', authenticate, listingController.updateListing);

// DELETE /api/waste/listings/:id - Delete listing
router.delete('/listings/:id', authenticate, listingController.deleteListing);

// GET /api/waste/my-listings - Get user's listings
router.get('/my-listings', authenticate, listingController.getUserListings);

// GET /api/waste/stats - Get user statistics
router.get('/stats', authenticate, listingController.getUserStats);

module.exports = router;