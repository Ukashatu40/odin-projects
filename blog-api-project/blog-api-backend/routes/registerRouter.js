const {Router} = require('express');

const registerRouter = Router();

const {registerUser} = require('../controllers/registerController');
const {validateRegistration} = require('../validators/validate');
const registrationMiddleware = require('../middlewares/registrationMiddleware');

registerRouter.post('/', validateRegistration, registrationMiddleware, registerUser);

module.exports = registerRouter