#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR ( 255 ),
  username VARCHAR ( 255 ),
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (text, username)
VALUES
  ('Hi there!', 'Amando'),
  ('How Are you?', 'Charles'),
  ('I am a Software Engineer!', 'Ukashatu Abdullahi'),
  ('Welcome to my page bro!', 'Fearless'),
  ('Greetings of the Day!', 'Umar'),
  ('Hey i am God of myself!', 'Ukashat'),
  ('Lets Connect!', 'coder'),
  ('Hey I am a Vibe Coder!', 'John');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.POSTGRES_URI,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
