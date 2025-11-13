const postsRouter = require('express').Router();
const authToken = require('../middlewares/authToken');
const postsMiddleware = require('../middlewares/postsMiddleware');
const {validatePostCreation} = require('../validators/validate');

const postsController = require('../controllers/postsController');

postsRouter.get("/", authToken, postsController.getAllPosts);
postsRouter.post("/", authToken, validatePostCreation, postsMiddleware, postsController.createPost);
postsRouter.get("/:id", authToken, postsController.getParticularPost);
postsRouter.get("/:id/comments", authToken, postsController.getCommentsForPost);
postsRouter.post("/:id/comments", authToken, postsController.addCommentToPost);

module.exports = postsRouter;