const Router = require("express");
const controller = require("../controllers/authorController");

const router = new Router();

//создать должность
router.post("/author", controller.create);

//список всех должностей
router.get("/author", controller.readAll);

//одна должность
router.get("/author/:id", controller.readOne);

//изменение должности
router.put("/author", controller.update);

//удаление должности
router.delete("/author/:id", controller.delete);



module.exports = router;