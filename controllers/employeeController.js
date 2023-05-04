const employeeModel = require("../models/employeeModel.js");

class employeeController {
	async create(req, res, next) {
		try {
			const { fullName, birthday, phone, address, positionID } = req.body;
			const post = await employeeModel.create({ fullName: fullName, birthday: birthday, phone: phone, address: address, positionID: positionID });
			return res.json(post);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);

		}
	}
	async readOne(req, res, next) {
		try {
			const { id } = req.params;
			const employeeData = await employeeModel.findById(id);
			return res.json(employeeData);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);

		}
	}
	async readAll(req, res, next) {
		try {
			const employeeData = await employeeModel.find();
			return res.json(employeeData);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);

		}
	}
	async update(req, res, next) {
		try {
			const employee = req.body;
			if (!employee._id) {
				return res.status(400).json({ message: "Id not found" });
			}
			const updatedEmployee = await employeeModel.findByIdAndUpdate(employee._id, employee, { new: true });
			return res.json(updatedEmployee);
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
			const deletedEmployee = await employeeModel.findByIdAndDelete(id);
			return res.json(deletedEmployee);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);

		}
	}
}

module.exports = new employeeController();