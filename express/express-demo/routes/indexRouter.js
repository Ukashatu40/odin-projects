// routes/indexRouter.js

const { Router } = require("express");
const indexRouter = Router();
const {indexController} = require("../controllers/indexController");

const {books, authors} = require("../db");

  
indexRouter.get("/", indexController);

module.exports = indexRouter;