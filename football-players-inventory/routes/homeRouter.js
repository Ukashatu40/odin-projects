const {Router} = require('express');
const homeRouter = Router();
const {renderHomePage} = require('../controllers/homeController');


homeRouter.get('/', renderHomePage);


module.exports = homeRouter;