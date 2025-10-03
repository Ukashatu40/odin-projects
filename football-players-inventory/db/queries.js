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
async function insertPlayers(name, category_id, position, club, nationality, age) {
  await pool.query(
    'INSERT INTO players (name, category_id, position, club, nationality, age) VALUES ($1, $2, $3, $4, $5, $6)',
    [name, category_id, position, club, nationality, age]
  );
}

async function updatePlayerWithProperties(name, category_id, position, club, nationality, age, id) {
  await pool.query(
    'UPDATE players SET name = $1, category_id = $2, position = $3, club = $4, nationality = $5, age = $6 WHERE id = $7',
    [name, category_id, position, club, nationality, age, id]
  );
}

async function getPlayerByIdWithHisCategory(id) {
  const { rows } = await pool.query('SELECT p.*, c.name AS category_name FROM players p JOIN categories c ON p.category_id = c.id WHERE p.id = $1', [id]);
  return rows[0];
}
async function getPlayerById(id) {
  const { rows } = await pool.query("SELECT * FROM players WHERE id = $1", [id]);
  return rows[0];
}
async function insertCategory(name, description) {
  await pool.query("INSERT INTO categories (name, description) VALUES ($1, $2)", [name, description]);
}

async function updateCategoryById(name, description, categoryId) {
  await pool.query("UPDATE categories SET name = $1, description = $2 WHERE id = $3", [name, description, categoryId]);
}

async function deleteCategoryById(categoryId) {
  await pool.query('DELETE FROM players WHERE category_id = $1', [categoryId]);
  await pool.query('DELETE FROM categories WHERE id = $1', [categoryId]);
}

async function deletePlayerById(id) {
  await pool.query("DELETE FROM players WHERE id = $1", [id]);
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
  insertPlayers,
  getPlayerByIdWithHisCategory,
  getPlayerById,
  updatePlayerWithProperties,
  deletePlayerById,
};
