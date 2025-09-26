const messages = require("../db");

const indexController = (req, res) => {
    res.render("index", {title: "Mini Messageboard",messages: messages});
}

const authorController = (req, res) => {
    const author = req.params.author;
    const filteredMessages = messages.filter(msg => msg.user === author);
    res.render("index", {title: `Messages by ${author}`, messages: filteredMessages});
}

module.exports = {indexController, authorController};