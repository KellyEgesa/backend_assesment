import express from "express";
import { CharacterService } from "../Models/Characters/characterService";

const router = express.Router();

router.get("/", async (req, res) => {
  let responses: CharacterService = new CharacterService();
  res.send(await responses.fetchCharacters(req, res));
});

// router.get("/:id", async (req, res) => {
//   let responses: BookService = new BookService();
//   res.send(await responses.fetchOneBook(req.params.id, res));
// });

module.exports = router;
