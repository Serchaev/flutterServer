const mongoose = require("mongoose");

const roleModel = new mongoose.Schema({
	value: { type: String, unique: true, default: "USER" },
})

module.exports = mongoose.model("Role", roleModel);