// Accountable schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountableSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Accountable', accountableSchema);
