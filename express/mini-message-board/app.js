const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const path = require("node:path");

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/message", indexRouter);


const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Mini Message Board app - listening on port ${PORT}!`);
});

module.exports = app;