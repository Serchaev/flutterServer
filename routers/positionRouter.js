const Router = require("express");
const controller = require("../controllers/positionController");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = new Router();

//создать должность
router.post("/position", authMiddleware, controller.create);

//список всех должностей
router.get("/position", authMiddleware, controller.readAll);

//одна должность
router.get("/position/:id", authMiddleware, controller.readOne);

//изменение должности
router.put("/position", authMiddleware, controller.update);

//удаление должности
router.delete("/position/:id", authMiddleware, controller.delete);



module.exports = router;