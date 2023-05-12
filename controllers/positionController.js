const positionModel = require("../models/positionModel.js");
const employeeModel = require("../models/employeeModel.js");

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
		console.log(1);
		try {
			const positionData = await positionModel.find();
			positionData.sort((a, b) => {
				return a.name.localeCompare(b.name);
			})
			return res.json({ "positions": positionData });

		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
	async update(req, res, next) {
		console.log(3);
		try {
			const position = req.body;
			console.log(position);
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
			console.log("id - ", id);
			if (!id) {
				return res.status(400).json({ message: "Id not found" });
			}
			// const position = await positionModel.find(id);
			const employees = await employeeModel.find();
			console.log("employees - ", employees);
			const tmp = [];
			employees.map((e) => {
				console.log("e - ", e);
				if (e.positionID.toString() == id) {

					console.log("e if - ", e);
					tmp.push(e);
				}
			});
			console.log("tmp - ", tmp);
			tmp.map(async (e) => {
				await employeeModel.findByIdAndDelete(e._id);
			})
			const deletedPosition = await positionModel.findByIdAndDelete(id);
			return res.json(deletedPosition);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
}

module.exports = new positionController();