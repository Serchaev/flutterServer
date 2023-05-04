require("dotenv").config();
const express = require("express");
const positionRouter = require("./routers/positionRouter.js");
const employeeRouter = require("./routers/employeeRouter.js");

const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({}));
app.use(express.static("static"));

app.use("/api/v1", positionRouter);
app.use("/api/v1", employeeRouter);


async function startApp() {
	try {
		const server = app.listen(PORT, () => console.log(`Server started: http://localhost:${PORT}/`));
	}
	catch (e) {
		console.log(e);
	}
};

startApp();