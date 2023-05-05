const Router = require("express");
const controller = require("../controllers/postController");

const router = new Router();

//создать должность
router.post("/post", controller.create);

//список всех должностей
router.get("/post", controller.readAll);

//одна должность
router.get("/post/:id", controller.readOne);

//изменение должности
router.put("/post", controller.update);

//удаление должности
router.delete("/post/:id", controller.delete);



module.exports = router;