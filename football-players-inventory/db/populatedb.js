#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const POSTGRES_URI = process.env.DEVELOPMENT ? process.env.POSTGRES_URI_DEV : process.env.POSTGRES_URI_PROD;

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 )
);

INSERT INTO usernames (username) 
VALUES
  ('Bryan'),
  ('Odin'),
  ('Damon');
`;

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
