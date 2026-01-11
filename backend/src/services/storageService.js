const { bucket } = require('../config/firebase-admin');
const { v4: uuidv4 } = require('uuid');

/**
 * Upload image buffer to Firebase Storage
 * @param {Buffer} imageBuffer - Image file buffer
 * @param {string} fileName - Desired file name/path
 * @param {string} mimeType - MIME type of the image
 * @returns {Promise<string>} Public URL of uploaded image
 */
const uploadToStorage = async (imageBuffer, fileName, mimeType) => {
  if (!bucket) {
    throw new Error('Firebase Storage is not initialized. Please configure Firebase credentials in .env file.');
  }

  try {
    // Generate unique filename if not provided
    const uniqueFileName = fileName || `uploads/${uuidv4()}.jpg`;
    
    // Create file reference
    const file = bucket.file(uniqueFileName);
    
    // Upload buffer to Firebase Storage
    await file.save(imageBuffer, {
      metadata: {
        contentType: mimeType || 'image/jpeg',
        metadata: {
          uploadedAt: new Date().toISOString()
        }
      },
      public: true,
      validation: 'md5'
    });

    // Make file publicly accessible
    await file.makePublic();

    // Get public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${uniqueFileName}`;
    
    console.log(`✅ File uploaded successfully: ${uniqueFileName}`);
    
    return publicUrl;
    
  } catch (error) {
    console.error('Storage upload error:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

/**
 * Delete image from Firebase Storage
 * @param {string} fileName - File path in storage
 * @returns {Promise<boolean>} Success status
 */
const deleteFromStorage = async (fileName) => {
  if (!bucket) {
    throw new Error('Firebase Storage is not initialized.');
  }

  try {
    const file = bucket.file(fileName);
    await file.delete();
    
    console.log(`✅ File deleted successfully: ${fileName}`);
    return true;
    
  } catch (error) {
    console.error('Storage deletion error:', error);
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

/**
 * Get signed URL for temporary access to private files
 * @param {string} fileName - File path in storage
 * @param {number} expiresIn - Expiration time in minutes (default: 60)
 * @returns {Promise<string>} Signed URL
 */
const getSignedUrl = async (fileName, expiresIn = 60) => {
  if (!bucket) {
    throw new Error('Firebase Storage is not initialized.');
  }

  try {
    const file = bucket.file(fileName);
    
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + expiresIn * 60 * 1000
    });
    
    return url;
    
  } catch (error) {
    console.error('Signed URL generation error:', error);
    throw new Error(`Failed to generate signed URL: ${error.message}`);
  }
};

/**
 * Check if file exists in storage
 * @param {string} fileName - File path in storage
 * @returns {Promise<boolean>} True if file exists
 */
const fileExists = async (fileName) => {
  if (!bucket) {
    return false;
  }

  try {
    const file = bucket.file(fileName);
    const [exists] = await file.exists();
    return exists;
  } catch (error) {
    console.error('File existence check error:', error);
    return false;
  }
};

/**
 * Get file metadata
 * @param {string} fileName - File path in storage
 * @returns {Promise<Object>} File metadata
 */
const getFileMetadata = async (fileName) => {
  if (!bucket) {
    throw new Error('Firebase Storage is not initialized.');
  }

  try {
    const file = bucket.file(fileName);
    const [metadata] = await file.getMetadata();
    return metadata;
  } catch (error) {
    console.error('Metadata retrieval error:', error);
    throw new Error(`Failed to get file metadata: ${error.message}`);
  }
};

module.exports = {
  uploadToStorage,
  deleteFromStorage,
  getSignedUrl,
  fileExists,
  getFileMetadata
};