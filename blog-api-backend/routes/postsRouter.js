const postsRouter = require('express').Router();
const authToken = require('../middlewares/authToken');
const postsMiddleware = require('../middlewares/postsMiddleware');
const {validatePostCreation} = require('../validators/validate');

const postsController = require('../controllers/postsController');

postsRouter.get("/", authToken, postsController.getAllPosts);
postsRouter.post("/", authToken, validatePostCreation, postsMiddleware, postsController.createPost);
postsRouter.get("/:id", authToken, postsController.getParticularPost);

module.exports = postsRouter;