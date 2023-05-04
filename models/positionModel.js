// Positions schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	salary: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Position', positionSchema);