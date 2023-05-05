const positionModel = require("../models/positionModel.js");

class positionController {
	async create(req, res, next) {
		try {
			const { name, salary } = req.body;
			const post = await positionModel.create({ name: name, salary: salary });
			return res.json(post);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
	async readOne(req, res, next) {
		try {
			const { id } = req.params;
			const positionData = await positionModel.findById(id);
			return res.json(positionData);

		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
	async readAll(req, res, next) {
		try {
			// const positionData = await positionModel.find();
			return res.json("positionData");

		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
	async update(req, res, next) {
		try {
			const position = req.body;
			if (!position._id) {
				return res.status(400).json({ message: "Id not found" });
			}
			const updatedPosition = await positionModel.findByIdAndUpdate(position._id, position, { new: true });
			return res.json(updatedPosition);

		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
	async delete(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				return res.status(400).json({ message: "Id not found" });
			}
			const deletedPosition = await positionModel.findByIdAndDelete(id);
			return res.json(deletedPosition);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
}

module.exports = new positionController();