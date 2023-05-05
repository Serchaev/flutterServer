const authorModel = require("../models/authorModel.js");

class authorController {
	async create(req, res, next) {
		try {
			const { fullName, email } = req.body;
			const post = await authorModel.create({ fullName: fullName, email: email });
			return res.json(post);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
	async readOne(req, res, next) {
		try {
			const { id } = req.params;
			const authorData = await authorModel.findById(id);
			return res.json(authorData);

		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
	async readAll(req, res, next) {
		try {
			const authorData = await authorModel.find();
			return res.json(authorData);

		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
	async update(req, res, next) {
		try {
			const author = req.body;
			if (!author._id) {
				return res.status(400).json({ message: "Id not found" });
			}
			const updatedAuthor = await authorModel.findByIdAndUpdate(author._id, author, { new: true });
			return res.json(updatedAuthor);

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
			const deletedAuthor = await authorModel.findByIdAndDelete(id);
			return res.json(deletedAuthor);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
}

module.exports = new authorController();