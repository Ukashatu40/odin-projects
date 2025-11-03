const usersRouter = require('express').Router();

const usersController = require('../controllers/usersController');

usersRouter.get("/", usersController.getAllUsers);

module.exports = usersRouter;