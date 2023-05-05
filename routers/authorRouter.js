const Router = require("express");
const controller = require("../controllers/authorController");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = new Router();

//создать должность
router.post("/author", authMiddleware, controller.create);

//список всех должностей
router.get("/author", authMiddleware, controller.readAll);

//одна должность
router.get("/author/:id", authMiddleware, controller.readOne);

//изменение должности
router.put("/author", authMiddleware, controller.update);

//удаление должности
router.delete("/author/:id", authMiddleware, controller.delete);



module.exports = router;