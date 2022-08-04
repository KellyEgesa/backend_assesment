import express from "express";

const router = express.Router();
const commentControllers = require("../Controllers/comment.controllers");

router.get("/", commentControllers.get);

router.post("/", commentControllers.post);

module.exports = router;
