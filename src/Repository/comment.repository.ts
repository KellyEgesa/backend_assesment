/**
 * CommentRepository
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CommentRepository = {
  async fetchAllComments() {
    let comments;

    comments = await prisma.comment.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    return comments;
  },

  async getBookComments(bookId: number) {
    const comments = await prisma.comment.findMany({
      where: { bookId: bookId },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    return comments;
  },

  async getCommentCount(bookId: number) {
    const comments = await prisma.totalCount.findUnique({
      where: { id: bookId },
    });

    return comments;
  },

  async getAllCommentCount() {
    const comments = await prisma.totalCount.findMany();

    return comments;
  },

  async addComment(bookId: number, content: string, ipAddress: string) {
    let newComment;
    await prisma.comment
      .create({
        data: {
          bookId: bookId,
          ipAddress: ipAddress,
          content: content,
        },
      })
      .then(async (createdComment) => {
        newComment = createdComment;

        const num = await prisma.comment.count({
          where: { bookId: bookId },
        });

        await prisma.totalCount.upsert({
          where: {
            id: bookId,
          },
          update: {
            commentCount: num,
          },
          create: {
            id: bookId,
            commentCount: 1,
          },
        });
      });

    return newComment;
  },
};
