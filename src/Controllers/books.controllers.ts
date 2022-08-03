import { BookService } from "../Services/book.service";

async function get(req, res, next) {
  try {
    res.json(await BookService.fetchBooks());
  } catch (exception) {
    if (exception.response != null && exception.response.status == 404) {
      res.status(404);
    } else {
      res.status(500);
    }
    next(exception);
  }
}
async function getById(req, res, next) {
  try {
    res.json(await BookService.fetchOneBook(req.params.id));
  } catch (exception) {
    if (exception.response != null && exception.response.status == 404) {
      res.status(404);
    } else if (exception == 422) {
      res.status(422);
    } else {
      res.status(500);
    }
    next(exception);
  }
}

module.exports = {
  get,
  getById,
};
