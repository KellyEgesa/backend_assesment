const bookRequest = require("supertest");
import { CommentRepository } from "../../src/Repository/comment.repository";

describe("/api/books", () => {
  let server;
  beforeEach(() => {
    server = require("../../src/app");
  });

  afterEach(async () => {
    await server.close();
  });

  describe("GET /", () => {
    const exec = async () => {
      return await bookRequest(server).get("/api/books");
    };

    it("should retrieve the books", async () => {
      await CommentRepository.addComment(
        1,
        "This is a test Comment",
        "127.0.0.1"
      );
      const res = await exec();

      expect(res.status).toBe(200);
    });
  });

  describe("GET /:id", () => {
    let id;
    const exec = async () => {
      return await bookRequest(server).get(`/api/books/${id}`);
    };

    it("should retrieve a books", async () => {
      id = 1;
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name");
    });

    it("should return error if id is not a number", async () => {
      id = "book";
      const res = await exec();

      expect(res.status).toBe(422);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("GET  /:id/comments", () => {
    let id;
    const exec = async () => {
      return await bookRequest(server).get(`/api/books/${id}/comments`);
    };

    it("should retrieve a books", async () => {
      id = 1;
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it("should return error if id is not a number", async () => {
      id = "book";
      const res = await exec();

      expect(res.status).toBe(422);
      expect(res.body).toHaveProperty("error");
    });
  });
});
