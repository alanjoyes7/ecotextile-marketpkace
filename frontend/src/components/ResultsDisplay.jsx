import React from 'react';
import { Check, AlertCircle, Edit2, Package, Scale, Star } from 'lucide-react';

const ResultsDisplay = ({ results, onEdit, isEditing, editedResults, onFieldChange }) => {
  if (!results) return null;

  const displayData = isEditing ? editedResults : results;

  const getClassificationColor = (classification) => {
    switch (classification) {
      case 'Reusable':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Recyclable':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Non-Recyclable':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getQualityStars = (quality) => {
    const levels = { 'Excellent': 5, 'Good': 4, 'Fair': 3, 'Poor': 2 };
    return levels[quality] || 3;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Check className="h-6 w-6 text-green-600 mr-2" />
          AI Analysis Results
        </h2>
        <button
          onClick={onEdit}
          className="flex items-center px-4 py-2 text-green-600 hover:bg-green-50 rounded-md transition"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          {isEditing ? 'Save Changes' : 'Edit Results'}
        </button>
      </div>

      {/* AI Confidence Indicator */}
      {results.aiConfidence && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-900">AI Confidence</span>
            <span className="text-sm font-bold text-blue-900">
              {(results.aiConfidence * 100).toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${results.aiConfidence * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Classification */}
        <div>
          <label className="label flex items-center">
            <Package className="h-4 w-4 mr-2 text-gray-600" />
            Classification
          </label>
          {isEditing ? (
            <select
              value={displayData.classification}
              onChange={(e) => onFieldChange('classification', e.target.value)}
              className="input mt-1"
            >
              <option value="Reusable">Reusable</option>
              <option value="Recyclable">Recyclable</option>
              <option value="Non-Recyclable">Non-Recyclable</option>
            </select>
          ) : (
            <div className="mt-2">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${getClassificationColor(displayData.classification)}`}>
                {displayData.classification}
              </span>
            </div>
          )}
        </div>

        {/* Fabric Type */}
        <div>
          <label className="label">Fabric Type</label>
          {isEditing ? (
            <input
              type="text"
              value={displayData.fabricType}
              onChange={(e) => onFieldChange('fabricType', e.target.value)}
              placeholder="e.g., Cotton, Polyester, Denim"
              className="input mt-1"
            />
          ) : (
            <p className="mt-1 text-lg font-medium text-gray-800">{displayData.fabricType}</p>
          )}
        </div>

        {/* Quality */}
        <div>
          <label className="label flex items-center">
            <Star className="h-4 w-4 mr-2 text-gray-600" />
            Quality
          </label>
          {isEditing ? (
            <select
              value={displayData.quality}
              onChange={(e) => onFieldChange('quality', e.target.value)}
              className="input mt-1"
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          ) : (
            <div className="mt-2 flex items-center space-x-2">
              <p className="text-lg font-medium text-gray-800">{displayData.quality}</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < getQualityStars(displayData.quality)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Estimated Weight */}
        <div>
          <label className="label flex items-center">
            <Scale className="h-4 w-4 mr-2 text-gray-600" />
            Estimated Weight
          </label>
          {isEditing ? (
            <input
              type="text"
              value={displayData.estimatedWeight}
              onChange={(e) => onFieldChange('estimatedWeight', e.target.value)}
              placeholder="e.g., 2.5 kg"
              className="input mt-1"
            />
          ) : (
            <p className="mt-1 text-lg font-medium text-gray-800">{displayData.estimatedWeight}</p>
          )}
        </div>

        {/* Additional Details (if available) */}
        {displayData.details && (
          <div>
            <label className="label">Additional Details</label>
            {isEditing ? (
              <textarea
                value={displayData.details}
                onChange={(e) => onFieldChange('details', e.target.value)}
                rows="3"
                className="input mt-1"
              />
            ) : (
              <p className="mt-1 text-gray-700">{displayData.details}</p>
            )}
          </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start">
        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
        <div className="text-sm text-amber-800">
          <p className="font-medium mb-1">Review and Edit</p>
          <p>Please review the AI analysis results and make corrections if needed before creating your listing.</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;