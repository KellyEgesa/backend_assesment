/**
 * CommentRepository
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CommentRepository = {
  async fetchAllComments() {
    let comments;
    try {
      comments = await prisma.comment.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    } catch (error) {
      return error;
    }
    console.log(comments);
    return comments;
  },

  async getBookComments(bookId: number) {
    const comments = await prisma.comment
      .findMany({
        where: { bookId: bookId },
      })
      .catch(async (e) => {
        return e;
      });

    return comments;
  },
  async getCommentCount(bookId: number) {
    const comments = await prisma.totalCount
      .findMany({
        where: { id: bookId },
      })
      .catch(async (e) => {
        return e;
      });

    return comments;
  },

  async getAllCommentCount() {
    const comments = await prisma.totalCount.findMany().catch(async (e) => {
      return e;
    });

    return comments;
  },
  async addComment(bookId: number, content: string, ipAddress: string) {
    const newComment = await prisma.comment
      .create({
        data: {
          bookId: bookId,
          ipAddress: ipAddress,
          content: content,
        },
      })
      .then(async () => {
        const a = await prisma.comment.findMany({
          where: { bookId: bookId },
        });
        console.log(a);
        let num = a.length;
        await prisma.totalCount.upsert({
          where: {
            id: bookId,
          },
          update: {
            commentCount: num + 1,
          },
          create: {
            id: bookId,
            commentCount: 1,
          },
        });
      })
      .catch(async (e) => {
        return e;
      });

    return newComment;
  },
};
