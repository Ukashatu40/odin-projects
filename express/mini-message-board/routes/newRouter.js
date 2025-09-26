const {Router} = require('express');
const newRouter = Router();
const {newController} = require("../controllers/newController");


newRouter.post("/", newController);

module.exports = newRouter;