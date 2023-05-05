require("dotenv").config();
const express = require("express");
const positionRouter = require("./routers/positionRouter.js");
const employeeRouter = require("./routers/employeeRouter.js");
const postsRouter = require("./routers/postRouter.js");
const authorsRouter = require("./routers/authorRouter.js");
const authRouter = require("./routers/authRouter.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const mongoose = require('mongoose')
const app = express();
const PORT = process.env.PORT || 8000;
const IP_ADDRESS = process.env.IP_ADDRESS || "localhost";
const DB_URL = process.env.DB_URL;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({}));
app.use(express.static("static"));

app.use("/api/v1", positionRouter);
app.use("/api/v1", employeeRouter);

app.use("/api/v2", postsRouter);
app.use("/api/v2", authorsRouter);

app.use("/auth", authRouter);


async function startApp() {
	try {
		await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => { console.log("db connected") })
		const server = app.listen(PORT, IP_ADDRESS, () => console.log(`Server started: http://${IP_ADDRESS}:${PORT}/`));
	}
	catch (e) {
		console.log(e);
	}
};

startApp();