import { BookService } from "../Services/book.service";
import { utils } from "../Utils/utils";
import { CommentService } from "../Services/comment.service";

async function get(req, res, next) {
  try {
    res.json(await CommentService.fetchComments());
  } catch (exception) {
    next(utils.errorFunction(exception));
  }
}

async function post(req, res, next) {
  try {
    res.json(await CommentService.createComment(req));
  } catch (exception) {
    next(utils.errorFunction(exception));
  }
}

module.exports = {
  get,
  post,
};
