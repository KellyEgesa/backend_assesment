import express from "express";
import { BookService } from "./Models/Books/bookService";
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  let responses: BookService = new BookService();
  res.send(await responses.fetchBooks("", res));
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
