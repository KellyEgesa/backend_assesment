import express from "express";
import { BookService } from "../Models/Books/bookService";

const router = express.Router();

router.get("/", async (req, res) => {
  let responses: BookService = new BookService();
  res.send(await responses.fetchBooks("", res));
});

module.exports = router;
