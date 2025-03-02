const mongoose = require('mongoose');

// Define the schema for the Course model
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // The course name is mandatory
    trim: true // Removes whitespace from both ends of the string
  },
  price: {
    type: Number,
    required: true, // The course price is mandatory
    min: 0 // Ensures the price is non-negative
  },
  image: {
    type: String,
    required: true, // The course image URL is mandatory
    trim: true
  },
  description: {
    type: String,
    trim: true // Optional field for course description
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Create and export the Course model
module.exports = mongoose.model('Course', courseSchema);
