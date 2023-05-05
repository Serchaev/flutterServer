const postModel = require("../models/postModel.js");

class postController {
	async create(req, res, next) {
		try {
			const { name, content, authorID } = req.body;
			const post = await postModel.create({ name: name, content: content, authorID: authorID });
			return res.json(post);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
	async readOne(req, res, next) {
		try {
			const { id } = req.params;
			const postData = await postModel.findById(id);
			return res.json(postData);

		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
	async readAll(req, res, next) {
		try {
			const postData = await postModel.find();
			return res.json(postData);

		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
	async update(req, res, next) {
		try {
			const post = req.body;
			if (!post._id) {
				return res.status(400).json({ message: "Id not found" });
			}
			const updatedPost = await postModel.findByIdAndUpdate(post._id, post, { new: true });
			return res.json(updatedPost);

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
			const deletedPost = await postModel.findByIdAndDelete(id);
			return res.json(deletedPost);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
}

module.exports = new postController();