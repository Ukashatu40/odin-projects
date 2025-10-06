// const { Pool } = require("pg");

// // All of the following properties should be read from environment variables
// // We're hardcoding them here for simplicity
// module.exports = new Pool({
//   host: "localhost", // or wherever the db is hosted
//   user: "postgres", // the default postgres user
//   database: "top_users",
//   password: "123456789",
//   port: 5433 // The default port
// });
require("dotenv").config();

const { Pool } = require("pg");

const POSTGRES_URI = process.env.DEVELOPMENT === "true" ? process.env.POSTGRES_URI_DEV : process.env.POSTGRES_URI_PROD;
// Again, this should be read from an environment variable
module.exports = new Pool({
  connectionString: POSTGRES_URI
});
