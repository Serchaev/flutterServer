const Router = require("express");
const controller = require("../controllers/employeeController");

const router = new Router();

//создать должность
router.post("/employee", controller.create);

//список всех должностей
router.get("/employee", controller.readAll);

//одна должность
router.get("/employee/:id", controller.readOne);

//изменение должности
router.put("/employee", controller.update);

//удаление должности
router.delete("/employee/:id", controller.delete);



module.exports = router;