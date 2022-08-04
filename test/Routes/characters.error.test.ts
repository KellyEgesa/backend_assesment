const axiosCharacter = require("axios");
jest.mock("axios");

const characterErrorRequest = require("supertest");

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
      return await characterErrorRequest(server).get(`/api/characters/`);
    };

    it("should return 500 if a book is not found", async () => {
      const mockedAxios = axiosCharacter as jest.Mocked<typeof axiosCharacter>;
      mockedAxios.get.mockResolvedValue({ status: 404, data: {} });
      const res = await exec();

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error");
    });
  });
});
