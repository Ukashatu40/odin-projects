const {getAllUsernames, insertMessage, } = require("../db/queries");

const indexController = async (req, res) => {
    const messages = await getAllUsernames();
    res.render("index", {title: "Mini Messageboard", messages: messages});
}

const authorController = async (req, res) => {
    const author = req.params.author;
    const messages = await getAllUsernames();
    const filteredMessages = messages.filter(msg => msg.user === author);
    res.render("index", {title: `Messages by ${author}`, messages: filteredMessages});
}

module.exports = {indexController, authorController};