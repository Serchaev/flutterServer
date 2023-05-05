require("dotenv").config();
const express = require("express");
const positionRouter = require("./routers/positionRouter.js");
const employeeRouter = require("./routers/employeeRouter.js");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;
const IP_ADDRESS = process.env.IP_ADDRESS || "localhost";


app.use(express.json());
// app.use(cookieParser());
app.use(cors());
// app.use(fileUpload({}));
// app.use(express.static("static"));

app.use("/api/v1", positionRouter);
app.use("/api/v1", employeeRouter);


async function startApp() {
	try {
		const server = app.listen(PORT, IP_ADDRESS, () => console.log(`Server started: http://${IP_ADDRESS}:${PORT}/`));
	}
	catch (e) {
		console.log(e);
	}
};

startApp();