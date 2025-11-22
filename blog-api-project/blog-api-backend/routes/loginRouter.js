const loginRouter = require('express').Router();
const {validateLogin} = require('../validators/validate');
const loginMiddleware = require('../middlewares/loginMiddleware');

const loginController = require('../controllers/loginController');

loginRouter.post("/",validateLogin, loginMiddleware, loginController);
module.exports = loginRouter;