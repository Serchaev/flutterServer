const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
	name: { type: String, required: true, min: 3, max: 30, unique: true },
	email: { type: String, required: true, min: 3, max: 70, unique: true },
	password: { type: String, required: true, min: 8, max: 70 },
	role: [{ type: String, ref: "Role" }]
})

module.exports = mongoose.model("User", userModel);