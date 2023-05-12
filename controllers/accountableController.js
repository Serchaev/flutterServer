const accountableModel = require("../models/accountableModel.js");
const taskModel = require("../models/taskModel.js");

class accountableController {
	async create(req, res, next) {
		try {
			const { fullName, phone, email } = req.body;
			const post = await accountableModel.create({ fullName: fullName, phone: phone, email: email });
			return res.json(post);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
	async readOne(req, res, next) {
		try {
			const { id } = req.params;
			const accountableData = await accountableModel.findById(id);
			return res.json(accountableData);

		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
	async readAll(req, res, next) {
		console.log(1);
		try {
			const accountableData = await accountableModel.find();
			return res.json({ "accountables": accountableData });

		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
	async update(req, res, next) {
		try {
			const accountable = req.body;
			if (!accountable._id) {
				return res.status(400).json({ message: "Id not found" });
			}
			const updatedAccountable = await accountableModel.findByIdAndUpdate(accountable._id, accountable, { new: true });
			return res.json(updatedAccountable);

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
			const tasks = await taskModel.find();
			const tmp = [];
			tasks.map((e) => {
				console.log("e - ", e);
				if (e.accontableID.toString() == id) {

					console.log("e if - ", e);
					tmp.push(e);
				}
			});
			tmp.map(async (e) => {
				await taskModel.findByIdAndDelete(e._id);
			})
			const deletedAccountable = await accountableModel.findByIdAndDelete(id);
			return res.json(deletedAccountable);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
}

module.exports = new accountableController();