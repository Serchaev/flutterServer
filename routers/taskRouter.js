const Router = require("express");
const controller = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = new Router();

//создать должность
router.post("/task", authMiddleware, controller.create);

//список всех должностей
router.get("/task", authMiddleware, controller.readAll);

//одна должность
router.get("/task/:id", authMiddleware, controller.readOne);

//изменение должности
router.put("/task", authMiddleware, controller.update);

//удаление должности
router.delete("/task/:id", authMiddleware, controller.delete);



module.exports = router;