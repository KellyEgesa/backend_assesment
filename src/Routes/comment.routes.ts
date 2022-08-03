import { PrismaClient } from "@prisma/client";
import express from "express";
import Joi from "joi";

const prisma = new PrismaClient();

const router = express.Router();

router.get("/", async (req, res) => {
  const allComments = await prisma.comment.findMany();
  res.send(allComments);
});

// router.post("/", async (req, res) => {
//   const { error } = validateComment(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const ipAdress: string = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
//   await prisma.comment.create({
//     data: {
//       bookId: req.body.bookId,
//       ipAddress: ipAdress,
//       content: req.body.content,
//     },
//   });

//   res.send(await responses.fetchOneBook(req.params.id, res));
// });

module.exports = router;
