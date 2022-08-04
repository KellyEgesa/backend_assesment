import { BookService } from "../Services/book.service";
import { utils } from "../Utils/utils";

async function get(req, res, next) {
  try {
    res.json(await BookService.fetchBooks());
  } catch (exception) {
    next(utils.errorFunction(exception));
  }
}
async function getById(req, res, next) {
  try {
    res.json(await BookService.fetchOneBook(req.params.id));
  } catch (exception) {
    next(utils.errorFunction(exception));
  }
}

async function getComments(req, res, next) {
  try {
    res.json(await BookService.fetchBookComment(req.params.id));
  } catch (exception) {
    next(utils.errorFunction(exception));
  }
}

module.exports = {
  get,
  getById,
  getComments,
};
