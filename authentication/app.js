/////// app.js

const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const PosgtresStore = require('connect-pg-simple')(session);
require("dotenv").config();

// Checking if wwe are in the Development Mode
const POSTGRES_URI = process.env.DEVELOPMENT === "true" ? process.env.POSTGRES_URI_DEV : process.env.POSTGRES_URI_PROD;
const pool = new Pool({
  // add your configuration
  connectionString: POSTGRES_URI
});
const sessionStore = new PosgtresStore({
  pool: pool,                // Connection pool
  tableName: 'session'   // Use another table-name than the default "session" one
});

// Using Local Strategy with passortjs
passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = rows[0];
  
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    })
  );

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      const user = rows[0];

      done(null, user);
    } catch(err) {
      done(err);
    }
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
app.use(passport.session());
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
