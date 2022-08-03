import bodyParser from "body-parser";

const express = require("express");
var cors = require("cors");

const bookRoutes = require("../Routes/book.routes");
const characterRoutes = require("../Routes/character.routes");
const commentRoutes = require("../Routes/comment.routes");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  /* Error handler middleware */
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });

    return;
  });

  app.use(cors());
  app.use(express.json());
  app.use("/api/books", bookRoutes);
  app.use("/api/characters", characterRoutes);
  app.use("/api/comments", commentRoutes);
};
