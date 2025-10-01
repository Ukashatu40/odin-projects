const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY name");
  return rows;
}

async function getAllPlayers() {
  await pool.query("SELECT * FROM players ORDER BY name");
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
  searchUsernames,
  deleteAllUsernames
};
