import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { validateImage, createPreviewUrl, revokePreviewUrl, formatFileSize } from '../utils/imageUtils';

const ImageUpload = ({ onImageSelect, onImageRemove, disabled = false }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (file) => {
    if (!file) return;

    // Validate file
    const validation = validateImage(file);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    // Clear previous error
    setError(null);

    // Create preview
    const previewUrl = createPreviewUrl(file);
    
    // Clean up old preview
    if (preview) {
      revokePreviewUrl(preview);
    }

    setSelectedFile(file);
    setPreview(previewUrl);
    
    // Notify parent component
    if (onImageSelect) {
      onImageSelect(file);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
  };

  const handleRemove = () => {
    if (preview) {
      revokePreviewUrl(preview);
    }
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (onImageRemove) {
      onImageRemove();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-green-500 bg-green-50'
              : error
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 hover:border-green-400 bg-gray-50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleInputChange}
            disabled={disabled}
            className="hidden"
          />
          
          <div className="flex flex-col items-center space-y-4">
            <div className={`p-4 rounded-full ${error ? 'bg-red-100' : 'bg-green-100'}`}>
              {error ? (
                <X className="h-8 w-8 text-red-600" />
              ) : (
                <Upload className="h-8 w-8 text-green-600" />
              )}
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-700 mb-1">
                {isDragging ? 'Drop image here' : 'Upload textile waste image'}
              </p>
              <p className="text-sm text-gray-500">
                Click to browse or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Supports: JPEG, PNG, WebP (Max 5MB)
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden bg-gray-100">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto max-h-96 object-contain"
          />
          
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4">
            <div className="flex justify-between items-start">
              <div className="text-white">
                <p className="font-medium text-sm">{selectedFile?.name}</p>
                <p className="text-xs opacity-90">{formatFileSize(selectedFile?.size)}</p>
              </div>
              <button
                onClick={handleRemove}
                disabled={disabled}
                className="p-2 bg-red-600 hover:bg-red-700 rounded-full transition disabled:opacity-50"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;