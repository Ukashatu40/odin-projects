require('dotenv').config();
const express = require('express');

const app = express();


// Middleware to parse JSON bodies
app.use(express.json());

const homeRouter = require('./routes/homeRouter');
const usersRouter = require('./routes/usersRouter');
const postsRouter = require('./routes/postsRouter');
const loginRouter = require('./routes/loginRouter');
const logoutRouter = require('./routes/logoutRouter');

// Mount routers
app.use("/api/home", homeRouter);
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);
app.use("/login", loginRouter);
app.use("logout", logoutRouter)


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
    }
);