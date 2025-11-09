const {Router} = require('express');

const registerRouter = Router();

const {registerUser} = require('../controllers/registerController');

registerRouter.post('/', registerUser);

module.exports = registerRouter