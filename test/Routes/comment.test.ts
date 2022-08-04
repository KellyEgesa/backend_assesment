const commentRequest = require("supertest");

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
      return await commentRequest(server).get("/api/comments");
    };

    it("should retrieve the comments", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });
  });

  describe("POST /", () => {
    let bookId;
    let content;
    const exec = async () => {
      return await commentRequest(server)
        .post("/api/comments")
        .send({ bookId, content });
    };

    it("should add a comment", async () => {
      (bookId = 1), (content = "A testing comment");
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it("should validate a comment", async () => {
      (bookId = "test"), (content = 1);
      const res = await exec();

      expect(res.status).toBe(400);
    });
  });
});
