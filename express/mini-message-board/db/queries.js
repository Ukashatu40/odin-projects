const pool = require("./pool");

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT text, username AS user, added FROM messages");
  return rows;
}
async function insertMessage(object) {
  const { text, user: username } = object; // Assuming you meant to use 'username' in the SQL
  
  try {
    await pool.query("INSERT INTO messages (text, username) VALUES ($1,$2)", [text, username]);
  } catch (error) {
    console.error("Error inserting message:", error);
    // Optionally re-throw the error or handle it (e.g., return false)
    throw error; 
  }
}

async function searchUsernames(search) {
  const { rows } = await pool.query("SELECT * FROM usernames WHERE username ILIKE $1", [`%${search}%`]);
  return rows;
}

async function deleteAllUsernames() {
  await pool.query("DELETE FROM usernames");
}

module.exports = {
  getAllUsernames,
  insertMessage,
  searchUsernames,
  deleteAllUsernames
};
