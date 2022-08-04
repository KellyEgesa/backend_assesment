const request = require("supertest");

describe("/api/character", () => {
  let server;
  beforeEach(() => {
    server = require("../../src/app");
  });

  afterEach(async () => {
    await server.close();
  });

  describe("GET /", () => {
    const exec = async () => {
      return await request(server).get("/api/characters");
    };

    it("should retrieve the characters", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });
  });

  describe("GET /?", () => {
    it("should sort the results", async () => {
      const res = await request(server).get("/api/characters/?sortBy=Age");

      expect(res.status).toBe(200);
    });

    it("should sort the results in asc order", async () => {
      const res = await request(server).get(
        "/api/characters/?sortBy=Age&OrderBy=desc"
      );

      expect(res.status).toBe(200);
    });

    it("should filter the results by gender", async () => {
      const res = await request(server).get("/api/characters/?gender=Female");

      expect(res.status).toBe(200);
    });
  });
});
