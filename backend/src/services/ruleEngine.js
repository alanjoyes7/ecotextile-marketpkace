/**
 * Rule-based classification system for textile waste
 * This provides a fallback and validation layer for AI classifications
 */

const fabricRules = {
  // High-quality reusable fabrics
  reusable: {
    fabrics: ['cotton', 'linen', 'silk', 'wool', 'cashmere', 'merino'],
    qualityRequired: ['excellent', 'good']
  },
  
  // Recyclable fabrics
  recyclable: {
    fabrics: ['polyester', 'nylon', 'acrylic', 'denim', 'fleece', 'spandex'],
    qualityRequired: ['excellent', 'good', 'fair']
  },
  
  // Non-recyclable or difficult to recycle
  nonRecyclable: {
    fabrics: ['mixed', 'composite', 'laminated', 'coated'],
    qualityRequired: ['poor']
  }
};

/**
 * Classify textile based on fabric type and quality
 * @param {string} fabricType - Type of fabric
 * @param {string} quality - Quality assessment (Excellent, Good, Fair, Poor)
 * @returns {Object} Classification result
 */
const classifyWithRules = (fabricType, quality) => {
  const normalizedFabric = fabricType.toLowerCase();
  const normalizedQuality = quality.toLowerCase();

  // Check if fabric is reusable
  if (
    fabricRules.reusable.fabrics.some(f => normalizedFabric.includes(f)) &&
    fabricRules.reusable.qualityRequired.includes(normalizedQuality)
  ) {
    return {
      classification: 'Reusable',
      reasoning: `${fabricType} in ${quality} condition is suitable for reuse`,
      suggestions: [
        'Clean and repair if needed',
        'Donate to charity organizations',
        'Sell on second-hand platforms',
        'Repurpose for other uses'
      ]
    };
  }

  // Check if fabric is recyclable
  if (
    fabricRules.recyclable.fabrics.some(f => normalizedFabric.includes(f)) &&
    fabricRules.recyclable.qualityRequired.includes(normalizedQuality)
  ) {
    return {
      classification: 'Recyclable',
      reasoning: `${fabricType} can be processed for recycling`,
      suggestions: [
        'Remove non-fabric components (buttons, zippers)',
        'Separate by color if possible',
        'Take to textile recycling facility',
        'Check for textile take-back programs'
      ]
    };
  }

  // Poor quality or non-recyclable materials
  if (
    normalizedQuality === 'poor' ||
    fabricRules.nonRecyclable.fabrics.some(f => normalizedFabric.includes(f))
  ) {
    return {
      classification: 'Non-Recyclable',
      reasoning: `${fabricType} in ${quality} condition has limited recycling options`,
      suggestions: [
        'Consider downcycling into insulation material',
        'Use for industrial wiping cloths',
        'Explore energy recovery options',
        'Check local waste management guidelines'
      ]
    };
  }

  // Default to recyclable if no clear match
  return {
    classification: 'Recyclable',
    reasoning: `Default classification - ${fabricType} should be evaluated by recycling facility`,
    suggestions: [
      'Consult with local textile recycling center',
      'Separate from general waste',
      'Consider professional assessment'
    ]
  };
};

/**
 * Validate if classification makes sense given the inputs
 * @param {string} fabricType - Type of fabric
 * @param {string} quality - Quality assessment
 * @param {string} classification - Proposed classification
 * @returns {Object} Validation result
 */
const validateClassification = (fabricType, quality, classification) => {
  const ruleBasedResult = classifyWithRules(fabricType, quality);
  
  const isValid = ruleBasedResult.classification === classification;
  
  return {
    isValid,
    ruleBasedClassification: ruleBasedResult.classification,
    userClassification: classification,
    confidence: isValid ? 0.95 : 0.5,
    warning: !isValid ? `Rule engine suggests ${ruleBasedResult.classification}` : null
  };
};

/**
 * Get estimated value based on classification and weight
 * @param {string} classification - Classification type
 * @param {string} quality - Quality assessment
 * @param {number} weight - Weight in kg
 * @returns {Object} Value estimation
 */
const estimateValue = (classification, quality, weight) => {
  // Price per kg in USD
  const priceRanges = {
    Reusable: {
      excellent: { min: 5, max: 15 },
      good: { min: 3, max: 8 },
      fair: { min: 1, max: 4 },
      poor: { min: 0, max: 1 }
    },
    Recyclable: {
      excellent: { min: 2, max: 5 },
      good: { min: 1, max: 3 },
      fair: { min: 0.5, max: 2 },
      poor: { min: 0.1, max: 0.5 }
    },
    'Non-Recyclable': {
      excellent: { min: 0.5, max: 1 },
      good: { min: 0.2, max: 0.5 },
      fair: { min: 0.1, max: 0.3 },
      poor: { min: 0, max: 0.1 }
    }
  };

  const weightNum = parseFloat(weight) || 0;
  const normalizedQuality = quality.toLowerCase();
  
  const range = priceRanges[classification]?.[normalizedQuality] || { min: 0, max: 1 };
  
  const minValue = (range.min * weightNum).toFixed(2);
  const maxValue = (range.max * weightNum).toFixed(2);
  const avgValue = ((range.min + range.max) / 2 * weightNum).toFixed(2);

  return {
    estimatedValue: avgValue,
    valueRange: {
      min: minValue,
      max: maxValue
    },
    currency: 'USD',
    note: 'Actual value may vary based on market conditions and buyer requirements'
  };
};

module.exports = {
  classifyWithRules,
  validateClassification,
  estimateValue,
  fabricRules
};
