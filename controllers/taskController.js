const taskModel = require("../models/taskModel.js");

class taskController {
	async create(req, res, next) {
		try {
			const { name, content, accontableID } = req.body;
			const post = await taskModel.create({ name: name, content: content, accontableID: accontableID });
			return res.json(post);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
	async readOne(req, res, next) {
		try {
			const { id } = req.params;
			const taskData = await taskModel.findById(id);
			return res.json(taskData);

		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
	async readAll(req, res, next) {
		try {
			const taskData = await taskModel.find();
			return res.json({ "tasks": taskData });

		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
	async update(req, res, next) {
		try {
			const task = req.body;
			if (!task._id) {
				return res.status(400).json({ message: "Id not found" });
			}
			const updatedTask = await taskModel.findByIdAndUpdate(task._id, task, { new: true });
			return res.json(updatedTask);

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
			const deletedTask = await taskModel.findByIdAndDelete(id);
			return res.json(deletedTask);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
}

module.exports = new taskController();