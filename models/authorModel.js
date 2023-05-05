// Author schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  dateOfRegistration: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Author', authorSchema);
