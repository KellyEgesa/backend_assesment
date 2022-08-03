import express from "express";

const router = express.Router();
const characterControllers = require("../Controllers/characters.controllers");

router.get("/", characterControllers.get);

// router.get("/:id", async (req, res) => {
//   let responses: BookService = new BookService();
//   res.send(await responses.fetchOneBook(req.params.id, res));
// });

module.exports = router;
