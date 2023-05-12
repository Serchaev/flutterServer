// Post schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  accontableID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accountable',
    required: true
  }
});

module.exports = mongoose.model('Task', taskSchema);
