const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.POSTGRES_URI_DEV });
const { getAllCategories, insertCategory, getCategoryById, getPlayersByCategoryId, updateCategoryById, deleteCategoryById } = require('../db/queries');

exports.getAllCategories = async (req, res) => {
  try {
    const result = await getAllCategories();
    res.render('categories/index', { categories: result });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getNewCategoryForm = (req, res) => {
  res.render('categories/new', { errors: [] });
};

exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    await insertCategory(name, description);
    res.redirect('/categories');
  } catch (err) {
    console.error(err);
    res.render('categories/new', { errors: [{ msg: 'Failed to create category' }] });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const categoryResult = await getCategoryById(req.params.id);
    const playersResult = await getPlayersByCategoryId(req.params.id);
    if (categoryResult.length === 0) {
      return res.status(404).send('Category not found');
    }
    res.render('categories/show', { category: categoryResult, players: playersResult });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getEditCategoryForm = async (req, res) => {
  try {
    const result = await getCategoryById(req.params.id);
    if (result.length === 0) {
      return res.status(404).send('Category not found');
    }
    res.render('categories/edit', { category: result, errors: [] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    await updateCategoryById(name, description, req.params.id);
    res.redirect(`/categories/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.render('categories/edit', { category: { id: req.params.id, name, description }, errors: [{ msg: 'Failed to update category' }] });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  console.log('deleteCategory - Deleting category ID:', id);
  try {
    const result = await deleteCategoryById(id);
    if (result.rowCount === 0) {
      return res.status(404).send('Category not found');
    }
    res.redirect('/categories');
  } catch (err) {
    console.error('Error deleting category:', err);
    if (err.code === '23503') { // Foreign key constraint violation
      res.status(400).send('Cannot delete category with associated players');
    } else {
      res.status(500).send('Server Error');
    }
  }
};