const {Router} = require('express');
const indexRouter = Router();
const {indexController, authorController} = require("../controllers/indexController");
const { newControllerPost, newControllerGet } = require('../controllers/newController');


indexRouter.get("/", indexController);
indexRouter.get("/message/:author", authorController);
indexRouter.get("/new", newControllerGet);
indexRouter.post("/new", newControllerPost);


module.exports = indexRouter;