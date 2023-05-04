const Router = require("express");
const controller = require("../controllers/positionController");

const router = new Router();

//создать должность
router.post("/position", controller.create);

//список всех должностей
router.get("/position", controller.readAll);

//одна должность
router.get("/position/:id", controller.readOne);

//изменение должности
router.put("/position", controller.update);

//удаление должности
router.delete("/position/:id", controller.delete);



module.exports = router;