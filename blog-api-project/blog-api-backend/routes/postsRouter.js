
const postsRouter = require('express').Router();
const authToken = require('../middlewares/authToken');
const validationMiddleware = require('../middlewares/validationMiddleware');
const { validatePostCreation } = require('../validators/validate');
const { validateComment } = require('../validators/validate');

const postsController = require('../controllers/postsController');

postsRouter.get("/", postsController.getAllPosts);
postsRouter.post("/", authToken, validatePostCreation, validationMiddleware, postsController.createPost);
postsRouter.get("/:id", postsController.getParticularPost);
postsRouter.put("/:id", authToken, validatePostCreation, validationMiddleware, postsController.updatePost);
postsRouter.delete("/:id", authToken, validationMiddleware, postsController.deletePost);
postsRouter.get("/:id/comments", postsController.getCommentsForPost);
postsRouter.post("/:id/comments", authToken, validateComment, validationMiddleware, postsController.addCommentToPost);
postsRouter.get("/:id/comments/:commentId", postsController.getCommentById);
postsRouter.put("/:id/comments/:commentId", authToken, validateComment, validationMiddleware, postsController.updateComment);
postsRouter.delete("/:id/comments/:commentId", authToken, validationMiddleware, postsController.deleteComment);

module.exports = postsRouter;