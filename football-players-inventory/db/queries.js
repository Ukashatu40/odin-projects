const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY name");
  return rows;
}

async function getAllPlayers() {
  const {rows} = await pool.query("SELECT * FROM players ORDER BY name");
  return rows;
}

async function getCategoryById(id) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
  return rows[0];
}

async function getPlayersByCategoryId(categoryId) {
  const {rows} = await pool.query("SELECT * FROM players WHERE category_id = $1 ORDER BY name", [categoryId]);
  return rows;
}

async function insertCategory(name, description) {
  await pool.query("INSERT INTO categories (name, description) VALUES ($1, $2)", [name, description]);
}

async function updateCategoryById(name, description, categoryId) {
  await pool.query("UPDATE categories SET name = $1, description = $2 WHERE id = $3", [name, description, categoryId]);
}

async function deleteCategoryById(categoryId) {
  await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [categoryId]);
}

async function searchUsernames(search) {
  const { rows } = await pool.query("SELECT * FROM usernames WHERE username ILIKE $1", [`%${search}%`]);
  return rows;
}


async function deleteAllUsernames() {
  await pool.query("DELETE FROM usernames");
}

module.exports = {
  getAllCategories,
  getAllPlayers,
  insertCategory,
  getCategoryById,
  getPlayersByCategoryId,
  updateCategoryById,
  deleteCategoryById,
};
