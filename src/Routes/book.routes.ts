import express from "express";
import {} from "../Controllers/books.controllers";

const router = express.Router();
const bookControllers = require("../Controllers/books.controllers");

router.get("/", bookControllers.get);

router.get("/:id", bookControllers.getById);

module.exports = router;
