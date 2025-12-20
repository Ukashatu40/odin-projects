const { Pool } = require('pg')
require('dotenv').config()

module.exports = new Pool({
    // Connection String below    connectionString: process.env.POSTGRES_URI_PROD
})
