import bodyParser from "body-parser";
import { error as errorMiddleWare } from "../Middlewares/errors.middleware";

const express = require("express");
var cors = require("cors");

const bookRoutes = require("../Routes/book.routes");
const characterRoutes = require("../Routes/character.routes");
const commentRoutes = require("../Routes/comment.routes");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cors());
  app.use(express.json());
  app.use("/api/books", bookRoutes);
  app.use("/api/characters", characterRoutes);
  app.use("/api/comments", commentRoutes);

  /* Error handler middleware */
  app.use(errorMiddleWare);
};
