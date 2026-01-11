const OpenAI = require('openai');
require('dotenv').config();

if (!process.env.OPENAI_API_KEY) {
  console.warn('⚠️  WARNING: OPENAI_API_KEY is not set in .env file');
  console.warn('   AI classification features will not work');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-api-key-here'
});

module.exports = openai;