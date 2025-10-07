const { Client } = require('pg')
require('dotenv').config()

const client = new Client({
    connectionString: process.env.POSTGRES_URI_PROD
})

async function dropTable() {
    try {
        console.log("Connecting...")
        await client.connect()
        console.log("Dropping table...")
        await client.query(`
            DROP TABLE messagess;
            DROP TABLE userss;
            DROP TABLE session;
        `)
        await client.end()
    } catch(err) {
        console.log("Drop tables failed.")
        throw new Error(err)
    }
    console.log("Dropped all tables.")
}

dropTable()