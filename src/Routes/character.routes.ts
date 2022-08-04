import express from "express";

const router = express.Router();
const characterControllers = require("../Controllers/characters.controllers");

router.get("/", characterControllers.get);

module.exports = router;
