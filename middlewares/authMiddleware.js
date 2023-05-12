const jwt = require("jsonwebtoken");

const validateAccessToken = (token) => {
	try {
		const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
		console.log(userData);
		return userData;
	} catch (e) {
		return null;
	}
}

module.exports = function (req, res, next) {
	try {
		const authorizationHeader = req.headers.authorization;
		// console.log("authorizationHeader", authorizationHeader);
		if (!authorizationHeader) {
			console.log("Не найден ключ авторизации в заголовках");
			return res.status(401).json({ message: "Не найден ключ авторизации в заголовках" });
		}
		const accessToken = authorizationHeader.split(" ")[1];
		if (!accessToken) {
			console.log("Не найден токен в заголовках");
			return res.status(401).json({ message: "Не найден токен в заголовках" });
		}
		console.log(accessToken);
		const userData = validateAccessToken(accessToken);
		if (!userData) {
			console.log("Access токен не прошел валидацию");
			return res.status(401).json({ message: "Access токен не прошел валидацию" });
		}
		req.user = userData;
		next();
	} catch (e) {
		console.log("Ошибка мидлваря");
		return res.status(500).json({ message: "Ошибка мидлваря" });
	}
}