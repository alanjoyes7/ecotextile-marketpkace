const openai = require('../config/openai');
const { classifyWithRules } = require('./ruleEngine');

const analyzeTextileImage = async (imageBuffer) => {
  try {
    const base64Image = imageBuffer.toString('base64');
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this textile waste image and provide:
1. Fabric type (e.g., Cotton, Polyester, Wool, Denim, Silk, etc.)
2. Quality assessment (Excellent, Good, Fair, or Poor)
3. Estimated weight in kg (provide a numeric estimate)
4. Visible condition and any damage
5. Suggested classification (Reusable, Recyclable, or Non-Recyclable)

Respond in JSON format:
{
  "fabricType": "string",
  "quality": "string",
  "estimatedWeight": "string (e.g., '2.5 kg')",
  "condition": "string",
  "suggestedClassification": "string"
}`
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 500
    });

    const aiResult = JSON.parse(response.choices[0].message.content);
    const ruleBasedClassification = classifyWithRules(aiResult.fabricType, aiResult.quality);

    return {
      classification: ruleBasedClassification.classification,
      fabricType: aiResult.fabricType,
      quality: aiResult.quality,
      estimatedWeight: aiResult.estimatedWeight,
      condition: aiResult.condition,
      aiConfidence: 0.85,
      details: `AI Analysis: ${aiResult.condition}`
    };
  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('Failed to analyze image with AI');
  }
};

module.exports = {
  analyzeTextileImage
};