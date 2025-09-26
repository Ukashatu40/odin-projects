const messages = require("../db");
const newControllerPost = (req, res) => {
    const {author, message} = req.body;
    if (!author || !message) {
        res.status(400).send("Author and message are required");
        return;
    }
    messages.push({text: message, user: author, added: new Date()});
    res.redirect("/");
};

const newControllerGet = (req, res) => {
    res.render("form", {title: "New Message"});
}

module.exports = {newControllerPost, newControllerGet};