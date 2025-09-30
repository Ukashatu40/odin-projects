const {Router} = require('express');
const usersRouter = Router();
const { getUsernames, createUsernameGet, createUsernamePost, deleteUsernames } = require('../controllers/usersController');

usersRouter.get('/', getUsernames);
usersRouter.post('/', createUsernamePost);
usersRouter.get('/create', createUsernameGet);
usersRouter.get('/delete', deleteUsernames);

module.exports = usersRouter;