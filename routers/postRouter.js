const Router = require("express");
const controller = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = new Router();

//создать должность
router.post("/post", authMiddleware, controller.create);

//список всех должностей
router.get("/post", authMiddleware, controller.readAll);

//одна должность
router.get("/post/:id", authMiddleware, controller.readOne);

//изменение должности
router.put("/post", authMiddleware, controller.update);

//удаление должности
router.delete("/post/:id", authMiddleware, controller.delete);



module.exports = router;