const homeController = require('../controllers/homeController');


const homeRouter = require('express').Router();
homeRouter.get("/", homeController);

module.exports = homeRouter;