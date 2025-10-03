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
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS players (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  position VARCHAR(100),
  club VARCHAR(100),
  nationality VARCHAR(100),
  age INTEGER
);

INSERT INTO categories (name, description) VALUES
('Goalkeeper', 'Players who guard the goal'),
('Defender', 'Players who protect the defensive zone'),
('Midfielder', 'Players who control the midfield'),
('Forward', 'Players who focus on scoring goals');

INSERT INTO players (name, category_id, position, club, nationality, age) VALUES
('Alisson Becker', 1, 'Goalkeeper', 'Liverpool', 'Brazil', 33),
('Virgil van Dijk', 2, 'Center Back', 'Liverpool', 'Netherlands', 34),
('Kevin De Bruyne', 3, 'Attacking Midfielder', 'Manchester City', 'Belgium', 34),
('Erling Haaland', 4, 'Striker', 'Manchester City', 'Norway', 25);
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
