const Router = require("express");
const controller = require("../controllers/accountableController");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = new Router();

//создать должность
router.post("/accountable", authMiddleware, controller.create);

//список всех должностей
router.get("/accountable", authMiddleware, controller.readAll);

//одна должность
router.get("/accountable/:id", authMiddleware, controller.readOne);

//изменение должности
router.put("/accountable", authMiddleware, controller.update);

//удаление должности
router.delete("/accountable/:id", authMiddleware, controller.delete);



module.exports = router;