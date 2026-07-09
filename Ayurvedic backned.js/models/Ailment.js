const mongoose = require('mongoose');

const ailmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  count: {
    type: String,
    default: "0 Products",
    trim: true
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true });

// 🚀 Safe Virtuals and Transforms to prevent structural parsing error in JSON
ailmentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
  }
});

module.exports = mongoose.model('Ailment', ailmentSchema);