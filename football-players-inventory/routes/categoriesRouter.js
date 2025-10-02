const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const categoryController = require('../controllers/categoryController');
const { validateCategory, validateUpdatedCategory, validateDeleteCategory } = require('../validators/validate');
const {validateCategoryErrorsMiddleware, validateCategoryUpdateMiddleware, deleteCategoryMiddelware} = require('../middlewares/middleware');

// Middleware to check admin password
const verifyAdmin = (req, res, next) => {
  if (req.body.adminPassword === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res.render('auth/admin', { errors: [{ msg: 'Invalid admin password' }] });
  }
};

router.get('/', categoryController.getAllCategories);
router.get('/new', categoryController.getNewCategoryForm);
router.post('/', validateCategory, validateCategoryErrorsMiddleware, categoryController.createCategory );
router.get('/:id', categoryController.getCategory);
router.get('/:id/edit', categoryController.getEditCategoryForm);
router.put('/:id', validateUpdatedCategory, validateCategoryUpdateMiddleware, verifyAdmin, categoryController.updateCategory);
router.delete('/:id', validateDeleteCategory, deleteCategoryMiddelware, verifyAdmin,categoryController.deleteCategory);

module.exports = router;