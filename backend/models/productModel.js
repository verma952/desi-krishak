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
  },
  price: {
    type: Number,
    required: true,
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
  location: {
    type: Object,
    required: true,
  },
  productType: {
    type: String,
    enum: ['cattle', 'dairy', 'farmingTools', 'other'],
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
  timestamps: true // ✅ Correct usage
});

module.exports = mongoose.model('Product', productSchema); // ✅ Use this line
