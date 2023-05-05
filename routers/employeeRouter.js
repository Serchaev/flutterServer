const Router = require("express");
const controller = require("../controllers/employeeController");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = new Router();

//создать должность
router.post("/employee", authMiddleware, controller.create);

//список всех должностей
router.get("/employee", authMiddleware, controller.readAll);

//одна должность
router.get("/employee/:id", authMiddleware, controller.readOne);

//изменение должности
router.put("/employee", authMiddleware, controller.update);

//удаление должности
router.delete("/employee/:id", authMiddleware, controller.delete);



module.exports = router;