const { analyzeTextileImage } = require('../services/aiService');
const { uploadToStorage } = require('../services/storageService');

const analyzeImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided'
      });
    }

    const imageBuffer = req.file.buffer;
    const fileName = `uploads/${req.user.uid}/${Date.now()}_${req.file.originalname}`;

    const imageUrl = await uploadToStorage(imageBuffer, fileName, req.file.mimetype);
    const analysisResult = await analyzeTextileImage(imageBuffer);

    res.status(200).json({
      success: true,
      data: {
        imageUrl,
        ...analysisResult
      }
    });
  } catch (error) {
    next(error);
  }
};

const validateCorrections = async (req, res, next) => {
  try {
    const { classification, fabricType, quality, estimatedWeight } = req.body;

    if (!classification || !fabricType || !quality || !estimatedWeight) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const validClassifications = ['Reusable', 'Recyclable', 'Non-Recyclable'];
    if (!validClassifications.includes(classification)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid classification'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        classification,
        fabricType,
        quality,
        estimatedWeight,
        validated: true
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeImage,
  validateCorrections
};