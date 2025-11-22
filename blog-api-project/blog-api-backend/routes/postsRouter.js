const postsRouter = require('express').Router();
const authToken = require('../middlewares/authToken');
const postsMiddleware = require('../middlewares/postsMiddleware');
const {validatePostCreation} = require('../validators/validate');
const {validateComment} = require('../validators/validate');
const {validateCommentMiddleware} = require('../middlewares/commentsMiddleware');

const postsController = require('../controllers/postsController');

postsRouter.use(authToken);

postsRouter.get("/", postsController.getAllPosts);
postsRouter.post("/", validatePostCreation, postsMiddleware, postsController.createPost);
postsRouter.get("/:id", postsController.getParticularPost);
postsRouter.put("/:id", validatePostCreation, postsMiddleware, postsController.updatePost);
postsRouter.delete("/:id", postsMiddleware, postsController.deletePost);
postsRouter.get("/:id/comments", postsController.getCommentsForPost);
postsRouter.post("/:id/comments", validateComment, validateCommentMiddleware, postsController.addCommentToPost);
postsRouter.get("/:id/comments/:commentId", postsController.getCommentById);
postsRouter.put("/:id/comments/:commentId", validateComment, validateCommentMiddleware, postsController.updateComment);
postsRouter.delete("/:id/comments/:commentId", postsMiddleware, postsController.deleteComment);

module.exports = postsRouter;