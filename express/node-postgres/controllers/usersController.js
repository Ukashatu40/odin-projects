const db = require("../db/queries");

async function getUsernames(req, res) {
  const {search} = req.query;

  if (search) {
    const usernames = await db.searchUsernames(search);
    console.log("Search results: ", usernames);
    return res.send("Search results: " + usernames.map(user => user.username).join(", "));
  }
  const usernames = await db.getAllUsernames();
  console.log("Usernames: ", usernames);
  res.send("Usernames: " + usernames.map(user => user.username).join(", "));
}

async function createUsernameGet(req, res) {
  // render the form
  res.render("form");
}

async function createUsernamePost(req, res) {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/");
}

async function deleteUsernames(req, res) {
  await db.deleteAllUsernames();
  res.redirect("/");
}

module.exports = {
  getUsernames,
  createUsernameGet,
  createUsernamePost,
  deleteUsernames
};
