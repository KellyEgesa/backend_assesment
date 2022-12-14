import express from "express";
import {} from "../Controllers/books.controllers";

const router = express.Router();
const bookControllers = require("../Controllers/books.controllers");

router.get("/", bookControllers.get);

router.get("/:id", bookControllers.getById);

router.get("/:id/comments", bookControllers.getComments);

module.exports = router;
