require('dotenv').config();
const express = require('express');

const app = express();


// Middleware to parse JSON bodies
app.use(express.json());

const homeRouter = require('./routes/homeRouter');

// Home route
app.use("/", homeRouter);


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
    }
);