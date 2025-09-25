// routes/bookRouter.js
const { Router } = require("express");
const bookRouter = Router();
const { getBookById } = require("../controllers/bookController");

bookRouter.get("/", (req, res) => res.send("All books"));
bookRouter.get("/:bookId", getBookById);

module.exports = bookRouter;