import React, { useState } from 'react';
import { Upload as UploadIcon, Image, X, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

const Upload = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    quantity: '',
    price: '',
    location: ''
  });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Math.random().toString(36),
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      alert('Listing created successfully!');
    }, 2000);
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '2rem' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'var(--gradient-primary)',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <UploadIcon size={32} color="white" />
          </div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2.5rem',
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.75rem'
          }}>
            Create New Listing
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
            Upload your textile items and connect with buyers
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
            {/* Image Upload */}
            <div style={{ marginBottom: '2rem' }}>
              <label className="form-label">
                <Image size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Product Images
              </label>
              
              <div style={{
                border: '2px dashed var(--border)',
                borderRadius: '0.75rem',
                padding: '2rem',
                textAlign: 'center',
                background: 'var(--bg)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                position: 'relative'
              }}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById('file-upload').click()}>
                <UploadIcon size={48} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
                <p style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Click to upload or drag and drop
                </p>
                <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
                  PNG, JPG, WEBP up to 10MB
                </p>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </div>

              {/* Image Preview */}
              {images.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: '1rem',
                  marginTop: '1rem'
                }}>
                  {images.map(img => (
                    <div key={img.id} style={{
                      position: 'relative',
                      aspectRatio: '1',
                      borderRadius: '0.5rem',
                      overflow: 'hidden',
                      background: `url(${img.preview}) center/cover`,
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        style={{
                          position: 'absolute',
                          top: '0.5rem',
                          right: '0.5rem',
                          background: 'rgba(0, 0, 0, 0.6)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="form-group">
              <label className="form-label">Listing Title *</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="e.g., Premium Cotton Fabric Scraps"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                name="description"
                className="form-textarea"
                placeholder="Describe your textile items, condition, and any special features..."
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="cotton">Cotton</option>
                  <option value="polyester">Polyester</option>
                  <option value="wool">Wool</option>
                  <option value="silk">Silk</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Quantity (kg) *</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-input"
                  placeholder="50"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Price (USD) *</label>
                <input
                  type="number"
                  name="price"
                  className="form-input"
                  placeholder="125"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Location *</label>
              <input
                type="text"
                name="location"
                className="form-input"
                placeholder="e.g., New York, USA"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* AI Classification Info */}
          <div className="alert alert-info" style={{ marginBottom: '2rem' }}>
            <AlertCircle size={20} />
            <div>
              <strong>AI Classification</strong>
              <p style={{ marginTop: '0.25rem', fontSize: '0.875rem' }}>
                Our AI will automatically analyze and grade your textiles after submission
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ padding: '1rem 2rem' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '1rem 2.5rem' }}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <div className="animate-spin" style={{ marginRight: '0.5rem' }}>⏳</div>
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Create Listing
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;