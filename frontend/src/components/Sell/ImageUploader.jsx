import React, { useState } from 'react';

function ImageUploader({ onUpload }) {
  const [images, setImages] = useState([null, null, null, null, null]);

  const handleImageChange = (index, file) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);

    const validFiles = updatedImages.filter((img) => img !== null);
    onUpload(validFiles);
  };

  const handleReset = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);

    const validFiles = updatedImages.filter((img) => img !== null);
    onUpload(validFiles);
  };

  return (
    <div>
      <p style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
        Upload up to 5 images (JPG or PNG):
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'space-between',
        }}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            style={{
              flex: '1 1 100%', // Full width on mobile
              maxWidth: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.5rem',
            }}
          >
            <label htmlFor={`image-${index}`}>Image {index + 1}</label>
            <input
              id={`image-${index}`}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files[0] || null)}
              style={{ width: '100%' }}
            />
            {images[index] && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ fontSize: '0.85rem', color: 'green' }}>
                  {images[index].name}
                </span>
                <button
                  type="button"
                  onClick={() => handleReset(index)}
                  style={{
                    padding: '4px 10px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;
