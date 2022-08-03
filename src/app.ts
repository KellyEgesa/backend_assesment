import express from "express";
const { Client } = require("pg");
import { BookService } from "./Models/Books/bookService";
import { CharacterService } from "./Models/Characters/characterService";
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config();
const port = process.env.PORT || 3000;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

client.connect();

console.log(process.env.DATABASE_URL);

// client.query(
//   "SELECT table_schema,table_name FROM information_schema.tables;",
//   (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//       console.log(JSON.stringify(row));
//     }
//     client.end();
//   }
// );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  let responses: CharacterService = new CharacterService();
  res.send(await responses.fetchCharacters(req, res));
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
