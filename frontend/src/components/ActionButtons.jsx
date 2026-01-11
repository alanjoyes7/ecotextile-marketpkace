import React from 'react';
import { Save, Send, ArrowLeft, Trash2, Loader2 } from 'lucide-react';

const ActionButtons = ({ 
  onSaveDraft, 
  onCreateListing, 
  onBack, 
  onCancel,
  isLoading = false,
  disabled = false,
  showDraft = true,
  showBack = true,
  primaryText = 'Create Listing',
  secondaryText = 'Save as Draft'
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-6">
      {/* Back Button */}
      {showBack && (
        <button
          onClick={onBack}
          disabled={isLoading}
          className="flex items-center justify-center px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
      )}

      {/* Cancel Button */}
      {onCancel && (
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="flex items-center justify-center px-4 py-2 border-2 border-red-300 text-red-700 rounded-md hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Cancel
        </button>
      )}

      <div className="flex-1" />

      {/* Save Draft Button */}
      {showDraft && onSaveDraft && (
        <button
          onClick={onSaveDraft}
          disabled={isLoading || disabled}
          className="flex items-center justify-center px-6 py-2 border-2 border-green-600 text-green-600 rounded-md hover:bg-green-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {secondaryText}
            </>
          )}
        </button>
      )}

      {/* Create Listing Button */}
      {onCreateListing && (
        <button
          onClick={onCreateListing}
          disabled={isLoading || disabled}
          className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              {primaryText}
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ActionButtons;