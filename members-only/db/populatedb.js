#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const POSTGRES_URI = process.env.DEVELOPMENT === 'true' ? process.env.POSTGRES_URI_DEV : process.env.POSTGRES_URI_PROD;

// const SQL = `
// CREATE TABLE IF NOT EXISTS usernames (
//   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//   username VARCHAR ( 255 )
// );

// INSERT INTO usernames (username) 
// VALUES
//   ('Bryan'),
//   ('Odin'),
//   ('Damon');
// `;

const SQL = `
CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                username VARCHAR(100) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                membership BOOLEAN DEFAULT FALSE,
                admin BOOLEAN DEFAULT FALSE
            );

            CREATE TABLE messages (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                title VARCHAR(255) NOT NULL,
                text TEXT NOT NULL
            );

            CREATE TABLE "session" (
            "sid" varchar NOT NULL COLLATE "default",
            "sess" json NOT NULL,
            "expire" timestamp(6) NOT NULL
            )
            WITH (OIDS=FALSE);
            ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
            CREATE INDEX "IDX_session_expire" ON "session" ("expire");
`

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: POSTGRES_URI,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
