const admin = require('firebase-admin');
require('dotenv').config();

// Check if Firebase is already initialized
if (!admin.apps.length) {
  try {
    // Parse the private key (handle escaped newlines)
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined;

    if (!process.env.FIREBASE_PROJECT_ID || !privateKey || !process.env.FIREBASE_CLIENT_EMAIL) {
      console.warn('⚠️  WARNING: Firebase credentials not fully configured in .env file');
      console.warn('   Firebase features will be disabled');
      console.warn('   The app will continue to run with limited functionality');
      console.warn('');
      console.warn('   Required variables in .env:');
      console.warn('   - FIREBASE_PROJECT_ID');
      console.warn('   - FIREBASE_PRIVATE_KEY');
      console.warn('   - FIREBASE_CLIENT_EMAIL');
      console.warn('   - FIREBASE_STORAGE_BUCKET');
    } else {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: privateKey,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET
      });
      console.log('✅ Firebase Admin initialized successfully');
    }
  } catch (error) {
    console.error('❌ Error initializing Firebase Admin:', error.message);
    console.warn('   Firebase features will be disabled');
  }
}

// Export Firebase services (may be null if initialization failed)
const db = admin.apps.length > 0 ? admin.firestore() : null;
const bucket = admin.apps.length > 0 && process.env.FIREBASE_STORAGE_BUCKET 
  ? admin.storage().bucket() 
  : null;
const auth = admin.apps.length > 0 ? admin.auth() : null;

module.exports = {
  admin: admin.apps.length > 0 ? admin : null,
  db,
  bucket,
  auth
};