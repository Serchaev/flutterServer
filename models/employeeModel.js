// Employees schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
	fullName: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	positionID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Position',
		required: true
	}
});

module.exports = mongoose.model('Employee', employeeSchema);