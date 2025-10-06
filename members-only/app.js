/////// app.js

const path = require("node:path");
const pool = require("./db/pool");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const PosgtresStore = require('connect-pg-simple')(session);
require("dotenv").config();


const sessionStore = new PosgtresStore({
  pool: pool,                // Connection pool
  tableName: 'session'   // Use another table-name than the default "session" one
});



const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({
  store: sessionStore,
   secret: "cats", 
   resave: false, 
   saveUninitialized: false,
   cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  }));
// Passport configs
require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log(req.session);
  if (req.session.viewCount) {
    req.session.viewCount++;
  } else {
    req.session.viewCount = 1;
  }
    res.render("index", { user: req.user, viewCount: req.session.viewCount });
  });

app.get("/sign-up", (req, res) => res.render("sign-up-form"));

app.post("/sign-up", async (req, res, next) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
        req.body.username,
        hashedPassword,
      ]);
      res.redirect("/");
    } catch(err) {
      return next(err);
    }
  });
  
app.post(
    "/log-in",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/"
    })
  );
  
app.get("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
  
app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
});
