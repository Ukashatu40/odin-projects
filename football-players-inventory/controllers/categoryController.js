const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.POSTGRES_URI_DEV });

exports.getAllCategories = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    res.render('categories/index', { categories: result.rows });
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
    await pool.query('INSERT INTO categories (name, description) VALUES ($1, $2)', [name, description]);
    res.redirect('/categories');
  } catch (err) {
    console.error(err);
    res.render('categories/new', { errors: [{ msg: 'Failed to create category' }] });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const categoryResult = await pool.query('SELECT * FROM categories WHERE id = $1', [req.params.id]);
    const playersResult = await pool.query('SELECT * FROM players WHERE category_id = $1', [req.params.id]);
    if (categoryResult.rows.length === 0) {
      return res.status(404).send('Category not found');
    }
    res.render('categories/show', { category: categoryResult.rows[0], players: playersResult.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getEditCategoryForm = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Category not found');
    }
    res.render('categories/edit', { category: result.rows[0], errors: [] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    await pool.query('UPDATE categories SET name = $1, description = $2 WHERE id = $3', [name, description, req.params.id]);
    res.redirect(`/categories/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.render('categories/edit', { category: { id: req.params.id, name, description }, errors: [{ msg: 'Failed to update category' }] });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await pool.query('DELETE FROM categories WHERE id = $1', [req.params.id]);
    res.redirect('/categories');
  } catch (err) {
    console.error(err);
    res.status(500).send('Cannot delete category with players');
  }
};