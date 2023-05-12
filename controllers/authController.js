const User = require("../models/userModel.js");
const Role = require("../models/roleModel.js");
const Token = require("../models/tokenModel.js");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fs = require("fs");


async function saveToken(userId, refreshToken) {
	const tokenData = await Token.findOne(userId);
	if (tokenData) {
		tokenData.refreshToken = refreshToken;
		return tokenData.save();
	}
	const token = await Token.create({ user: userId, refreshToken })
	return token;
}


const generateAccessToken = (id, roles) => {
	const payload = {
		id,
		roles
	}
	const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "5m" });
	const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "24h" });
	return {
		accessToken,
		refreshToken
	}
}

const validateAccessToken = (token) => {
	try {
		const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
		return userData;
	} catch (e) {
		return null;
	}
}

const validateRefreshToken = (token) => {
	try {
		const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
		return userData;
	} catch (e) {
		return null;
	}
}


class authController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: "Ошибка при регистрации", errors });
			}
			const { name, email, password } = req.body
			const candiate = await User.findOne({ name });
			if (candiate) {
				return res.status(400).json({ message: "Пользователь с таким именем уже существует" });
			}
			const hashPassword = bcrypt.hashSync(password, 7);
			const userRole = await Role.findOne({ value: "USER" });
			const user = new User({ name, email, password: hashPassword, role: [userRole.value] });
			user.save();
			return res.status(200).json({ message: "Пользователь успешно зарегистрирован" });
		} catch (e) {
			return res.status(500).json({ message: "Ошибка при регистрации!" });
		}
	}

	async login(req, res, next) {
		try {
			console.log("INFO '/login' POST");
			const { name, password } = req.body;
			const user = await User.findOne({ name });
			if (!user) {
				return res.status(400).json({ message: "Пользователя с таким именем не существует" });
			}
			const validPassword = bcrypt.compareSync(password, user.password);
			if (!validPassword) {
				return res.status(400).json({ message: "Введен не верный пароль" });
			}
			const tokens = generateAccessToken(user._id, user.role);
			const tokensSave = await saveToken(user._id, tokens.refreshToken);

			return res.json({ ...tokens, user: { userId: user._id, userRole: user.role } });
		} catch (e) {
			return res.status(500).json({ message: "Ошибка при авторизации" });
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.body;
			const tokenData = await Token.deleteOne({ refreshToken });
			return res.json(tokenData);

		} catch (e) {
			return res.status(500).json({ message: "Ошибка при выходе из аккаунта" });
		}
	}

	async refresh(req, res, next) {
		console.log("refresh")
		try {
			console.log("req.body ", req.body);
			const { refreshToken } = req.body;
			console.log("refresh ", refreshToken);
			if (!refreshToken) {
				return res.status(400).json({ message: "refreshToken not found" });
			}
			const userData = validateRefreshToken(refreshToken);
			const tokenData = await Token.findOne({ refreshToken });
			if (!userData || !tokenData) {
				return res.status(400).json({ message: "refreshToken не коректен" });
			}
			const user = await User.findById(userData.id);
			const tokens = generateAccessToken(user._id, user.role);
			const tokensSave = await saveToken(user._id, tokens.refreshToken);
			return res.json({ ...tokens, user: { userId: user._id, userRole: user.role } });
		} catch (e) {
			return res.status(500).json({ message: "Ошибка при авторизации" });
		}
	}

	async getUser(req, res, next) {
		try {
			const userData = req.user;
			const user = await User.findById(userData.id);
			return res.json(user);
		} catch (e) {
			return res.status(500).json({ message: "getUser error" });
		}
	}

	async roles(req, res, next) {
		try {
			const userRole = new Role();
			const moderRole = new Role({ value: "MODER" });
			await userRole.save();
			await moderRole.save();
			res.json("server work");
		} catch (e) {
			return res.status(500).json({ message: "roles error" });
		}
	}
}

module.exports = new authController();