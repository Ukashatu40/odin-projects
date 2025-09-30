const {getAllUsernames, insertMessage} = require("../db/queries")
const newControllerPost = async (req, res) => {
    const {author, message} = req.body;
    if (!author || !message) {
        res.status(400).send("Author and message are required");
        return;
    }
    await insertMessage({text: message, user: author});
    res.redirect("/");
};

const newControllerGet = (req, res) => {
    res.render("form", {title: "New Message"});
}

module.exports = {newControllerPost, newControllerGet};