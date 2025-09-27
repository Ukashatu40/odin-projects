const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const path = require("node:path");

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/message", indexRouter);


const PORT = process.env.PORT || 3000;

// Tell the app to listen on the dynamically assigned PORT and on all network interfaces ('0.0.0.0')
app.listen(PORT, '0.0.0.0', (error) => {
    if (error) {
        throw error;
    }
    // The console log now reflects the actual port being used
    console.log(`Mini Message Board app - listening on port ${PORT}!`);
});


module.exports = app;