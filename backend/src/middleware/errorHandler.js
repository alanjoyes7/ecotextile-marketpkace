const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Multer file upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      error: 'File size too large. Maximum size is 5MB.'
    });
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      success: false,
      error: 'Too many files uploaded.'
    });
  }

  // Firebase errors
  if (err.code && typeof err.code === 'string' && err.code.startsWith('auth/')) {
    return res.status(401).json({
      success: false,
      error: 'Authentication error',
      details: err.message
    });
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: err.errors || err.message
    });
  }

  // OpenAI API errors
  if (err.message && err.message.includes('OpenAI')) {
    return res.status(503).json({
      success: false,
      error: 'AI service temporarily unavailable',
      details: 'Please try again later'
    });
  }

  // Firestore errors
  if (err.message && err.message.includes('Firestore')) {
    return res.status(503).json({
      success: false,
      error: 'Database service unavailable',
      hint: 'Firebase Firestore may not be configured'
    });
  }

  // Default error response
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;