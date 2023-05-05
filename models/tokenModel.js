const mongoose = require("mongoose");

const tokenModel = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	refreshToken: { type: String, required: true },
})

module.exports = mongoose.model("Token", tokenModel);