const homeController = require('../controllers/homeController');
const authToken = require('../middlewares/authToken');


const homeRouter = require('express').Router();
homeRouter.get("/", authToken, homeController);

module.exports = homeRouter;