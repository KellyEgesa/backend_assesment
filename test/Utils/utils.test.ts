import { notFound } from "../../src/Utils/Strings";
import { utils } from "../../src/Utils/utils";

describe("UTILS", () => {
  describe("Error", () => {
    it("should return a 404 exception if a book is not found", async () => {
      const exception = { response: { status: 404 } };

      expect(utils.errorFunction(exception)).toStrictEqual({
        statusCode: 404,
        message: notFound,
      });
    });
  });
});
