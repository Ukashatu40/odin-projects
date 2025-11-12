const usersRouter = require('express').Router();

const usersController = require('../controllers/usersController');
const authToken = require('../middlewares/authToken');

usersRouter.get("/", authToken, usersController.getAllUsers);

module.exports = usersRouter;