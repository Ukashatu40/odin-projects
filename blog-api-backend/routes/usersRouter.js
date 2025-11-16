const usersRouter = require('express').Router();
const {validateUserUpdate} = require('../validators/validate');
const userUpdateMiddleware = require('../middlewares/userUpdateMiddleware');

const usersController = require('../controllers/usersController');
const authToken = require('../middlewares/authToken');

usersRouter.get("/", authToken, usersController.getAllUsers);
usersRouter.get("/:id", authToken, usersController.getUserById);
usersRouter.delete("/:id", authToken, usersController.deleteUser);
usersRouter.put("/:id", authToken, validateUserUpdate, userUpdateMiddleware, usersController.updateUser);
usersRouter.get("/:id/posts", authToken, usersController.getPostsByUser);
usersRouter.get("/:id/posts/:postId", authToken, usersController.getPostByUserById);
module.exports = usersRouter;