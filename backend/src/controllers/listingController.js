const { db } = require('../config/firebase-admin');
const { v4: uuidv4 } = require('uuid');

/**
 * Create a new textile waste listing
 */
const createListing = async (req, res, next) => {
  try {
    const {
      imageUrl,
      classification,
      fabricType,
      quality,
      estimatedWeight,
      condition,
      price,
      location,
      description
    } = req.body;

    // Validation
    if (!imageUrl || !classification || !fabricType || !quality) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const listingId = uuidv4();
    const listing = {
      id: listingId,
      userId: req.user.uid,
      userEmail: req.user.email,
      imageUrl,
      classification,
      fabricType,
      quality,
      estimatedWeight: estimatedWeight || 'N/A',
      condition: condition || 'Not specified',
      price: price || 0,
      location: location || 'Not specified',
      description: description || '',
      status: 'active',
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await db.collection('listings').doc(listingId).set(listing);

    res.status(201).json({
      success: true,
      data: listing,
      message: 'Listing created successfully'
    });
    
  } catch (error) {
    next(error);
  }
};

/**
 * Get all listings with optional filters
 */
const getListings = async (req, res, next) => {
  try {
    const {
      classification,
      fabricType,
      quality,
      minPrice,
      maxPrice,
      status = 'active',
      limit = 20,
      offset = 0
    } = req.query;

    let query = db.collection('listings');

    // Apply filters
    if (classification) {
      query = query.where('classification', '==', classification);
    }
    if (fabricType) {
      query = query.where('fabricType', '==', fabricType);
    }
    if (quality) {
      query = query.where('quality', '==', quality);
    }
    if (status) {
      query = query.where('status', '==', status);
    }

    // Get total count
    const snapshot = await query.get();
    const total = snapshot.size;

    // Apply pagination and ordering
    query = query
      .orderBy('createdAt', 'desc')
      .limit(parseInt(limit))
      .offset(parseInt(offset));

    const querySnapshot = await query.get();
    const listings = [];

    querySnapshot.forEach(doc => {
      const data = doc.data();
      
      // Apply price filters in memory (since Firestore range queries are limited)
      if (minPrice && data.price < parseFloat(minPrice)) return;
      if (maxPrice && data.price > parseFloat(maxPrice)) return;
      
      listings.push(data);
    });

    res.status(200).json({
      success: true,
      data: {
        listings,
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: offset + listings.length < total
        }
      }
    });
    
  } catch (error) {
    next(error);
  }
};

/**
 * Get single listing by ID
 */
const getListingById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const doc = await db.collection('listings').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Listing not found'
      });
    }

    // Increment view count
    await db.collection('listings').doc(id).update({
      views: (doc.data().views || 0) + 1
    });

    res.status(200).json({
      success: true,
      data: { ...doc.data(), views: (doc.data().views || 0) + 1 }
    });
    
  } catch (error) {
    next(error);
  }
};

/**
 * Update listing
 */
const updateListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const doc = await db.collection('listings').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Listing not found'
      });
    }

    // Check ownership
    if (doc.data().userId !== req.user.uid) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this listing'
      });
    }

    // Prevent updating certain fields
    delete updates.id;
    delete updates.userId;
    delete updates.createdAt;
    delete updates.views;

    updates.updatedAt = new Date().toISOString();

    await db.collection('listings').doc(id).update(updates);

    const updatedDoc = await db.collection('listings').doc(id).get();

    res.status(200).json({
      success: true,
      data: updatedDoc.data(),
      message: 'Listing updated successfully'
    });
    
  } catch (error) {
    next(error);
  }
};

/**
 * Delete listing
 */
const deleteListing = async (req, res, next) => {
  try {
    const { id } = req.params;

    const doc = await db.collection('listings').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Listing not found'
      });
    }

    // Check ownership
    if (doc.data().userId !== req.user.uid) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this listing'
      });
    }

    await db.collection('listings').doc(id).delete();

    res.status(200).json({
      success: true,
      message: 'Listing deleted successfully'
    });
    
  } catch (error) {
    next(error);
  }
};

/**
 * Get user's listings
 */
const getUserListings = async (req, res, next) => {
  try {
    const { status, limit = 50 } = req.query;

    let query = db.collection('listings')
      .where('userId', '==', req.user.uid);

    if (status) {
      query = query.where('status', '==', status);
    }

    const snapshot = await query
      .orderBy('createdAt', 'desc')
      .limit(parseInt(limit))
      .get();

    const listings = [];
    snapshot.forEach(doc => {
      listings.push(doc.data());
    });

    res.status(200).json({
      success: true,
      data: listings
    });
    
  } catch (error) {
    next(error);
  }
};

/**
 * Get user statistics
 */
const getUserStats = async (req, res, next) => {
  try {
    const snapshot = await db.collection('listings')
      .where('userId', '==', req.user.uid)
      .get();

    let stats = {
      totalListings: 0,
      activeListings: 0,
      soldListings: 0,
      totalViews: 0,
      byClassification: {
        Reusable: 0,
        Recyclable: 0,
        'Non-Recyclable': 0
      }
    };

    snapshot.forEach(doc => {
      const data = doc.data();
      stats.totalListings++;
      stats.totalViews += data.views || 0;
      
      if (data.status === 'active') stats.activeListings++;
      if (data.status === 'sold') stats.soldListings++;
      
      if (stats.byClassification[data.classification] !== undefined) {
        stats.byClassification[data.classification]++;
      }
    });

    res.status(200).json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
  getUserListings,
  getUserStats
};
