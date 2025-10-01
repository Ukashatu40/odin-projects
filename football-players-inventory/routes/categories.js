const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const categoryController = require('../controllers/categoryController');

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
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('categories/new', { errors: errors.array() });
    }
    next();
  },
  categoryController.createCategory
);
router.get('/:id', categoryController.getCategory);
router.get('/:id/edit', categoryController.getEditCategoryForm);
router.put(
  '/:id',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('adminPassword').notEmpty().withMessage('Admin password is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('categories/edit', { category: { id: req.params.id, name: req.body.name, description: req.body.description }, errors: errors.array() });
    }
    next();
  },
  verifyAdmin,
  categoryController.updateCategory
);
router.delete(
  '/:id',
  [body('adminPassword').notEmpty().withMessage('Admin password is required')],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('auth/admin', { errors: errors.array() });
    }
    next();
  },
  verifyAdmin,
  categoryController.deleteCategory
);

module.exports = router;