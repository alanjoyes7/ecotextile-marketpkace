const admin = require('../config/firebase-admin');
const db = admin.firestore();

class WasteRecord {
  constructor(data) {
    this.userId = data.userId;
    this.imageUrl = data.imageUrl;
    this.classification = data.classification; // Reusable, Recyclable, Non-Recyclable
    this.fabricType = data.fabricType;
    this.quality = data.quality;
    this.estimatedWeight = data.estimatedWeight;
    this.aiConfidence = data.aiConfidence;
    this.userCorrected = data.userCorrected || false;
    this.status = data.status || 'active'; // active, sold, inactive
    this.price = data.price;
    this.location = data.location;
    this.description = data.description || '';
    this.contactInfo = data.contactInfo;
    this.views = data.views || 0;
    this.inquiries = data.inquiries || 0;
    this.createdAt = data.createdAt || admin.firestore.FieldValue.serverTimestamp();
    this.updatedAt = admin.firestore.FieldValue.serverTimestamp();
  }

  static validate(data) {
    const errors = [];

    if (!data.userId) errors.push('User ID is required');
    if (!data.imageUrl) errors.push('Image URL is required');
    if (!data.classification) errors.push('Classification is required');
    if (!['Reusable', 'Recyclable', 'Non-Recyclable'].includes(data.classification)) {
      errors.push('Invalid classification type');
    }
    if (!data.fabricType) errors.push('Fabric type is required');
    if (!data.quality) errors.push('Quality is required');
    if (!data.estimatedWeight) errors.push('Estimated weight is required');
    if (data.price && (isNaN(data.price) || data.price < 0)) {
      errors.push('Price must be a positive number');
    }

    if (errors.length > 0) {
      const error = new Error('Validation failed');
      error.name = 'ValidationError';
      error.errors = errors;
      throw error;
    }

    return true;
  }

  static async create(data) {
    this.validate(data);
    const record = new WasteRecord(data);
    const docRef = await db.collection('listings').add(JSON.parse(JSON.stringify(record)));
    return { id: docRef.id, ...record };
  }

  static async findById(id) {
    const doc = await db.collection('listings').doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  static async findByUserId(userId) {
    const snapshot = await db.collection('listings')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async findAll(filters = {}) {
    let query = db.collection('listings');

    // Apply filters
    if (filters.classification) {
      query = query.where('classification', '==', filters.classification);
    }
    if (filters.fabricType) {
      query = query.where('fabricType', '==', filters.fabricType);
    }
    if (filters.status) {
      query = query.where('status', '==', filters.status);
    }
    if (filters.location) {
      query = query.where('location', '==', filters.location);
    }

    // Order by creation date
    query = query.orderBy('createdAt', 'desc');

    // Pagination
    if (filters.limit) {
      query = query.limit(parseInt(filters.limit));
    }

    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async update(id, updates) {
    const updateData = {
      ...updates,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    await db.collection('listings').doc(id).update(updateData);
    return this.findById(id);
  }

  static async delete(id) {
    await db.collection('listings').doc(id).delete();
    return { success: true };
  }

  static async incrementViews(id) {
    await db.collection('listings').doc(id).update({
      views: admin.firestore.FieldValue.increment(1)
    });
  }

  static async incrementInquiries(id) {
    await db.collection('listings').doc(id).update({
      inquiries: admin.firestore.FieldValue.increment(1)
    });
  }
}

module.exports = WasteRecord;