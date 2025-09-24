const {books, authors} = require("../db");

const indexController = (req, res) => {
    let result = "Books and Their Authors:\n"

    for(let i = 0; i < books.length; i++) {
        const book =  books[i].name;
        const author = authors[i].name;
        result += `${book} by ${author}\n`;
    }

    res.send(result);
}

module.exports = {indexController};