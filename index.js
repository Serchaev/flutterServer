require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({}));
app.use(express.static("static"));


async function startApp() {
	try {
		const server = app.listen(PORT, () => console.log(`Server started: http://localhost:${PORT}/`));
	}
	catch (e) {
		console.log(e);
	}
};

startApp();