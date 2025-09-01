// backend/models/productModel.js - Refactored

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true, // ✅ Removes whitespace from the beginning and end
  },
  price: {
    type: Number,
    required: true,
    min: 0, // ✅ Price cannot be negative
  },
  phone: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  village: {
    type: String,
    required: true,
  },
  subType: {
    type: String,
  },
  // ✅ CRITICAL: Changed to GeoJSON format for location queries
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number], // Array of numbers for [longitude, latitude]
      required: true
    }
  },
  productType: {
    type: String,
    // ✅ Expanded enum to match frontend categories for consistency
    enum: ['cattle', 'dairy', 'equipment', 'grains', 'vegetables', 'other'],
    required: true,
  },

  milkProductionLitersPerDay: {
    type: Number,
    required: function () {
      return this.productType === 'cattle';
    },
  },
  images: [String]
}, {
  timestamps: true
});

// ✅ CRITICAL: Add the 2dsphere index for location-based searching
productSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Product', productSchema);