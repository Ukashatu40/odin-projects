const {validationResult} = require('express-validator');
const { deleteCategory } = require('../controllers/categoryController');

 const validateCategoryErrorsMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('categories/new', { errors: errors.array() });
    }
    next();
  }

const validateCategoryUpdateMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('categories/edit', { category: { id: req.params.id, name: req.body.name, description: req.body.description }, errors: errors.array() });
  }
  next();
}

 const deleteCategoryMiddelware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('auth/admin', { errors: errors.array() });
  }
  next();
}

module.exports = {validateCategoryErrorsMiddleware, validateCategoryUpdateMiddleware, deleteCategoryMiddelware};