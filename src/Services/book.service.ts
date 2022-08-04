import axios from "axios";
import { Book } from "../Models/books.model";
import { url } from "../Utils/Strings";
import { CommentRepository } from "../Repository/comment.repository";
import { utils } from "../Utils/utils";
import { Error } from "../Utils/error";

let urlBook: string = url + "books";

export const BookService = {
  async fetchBooks() {
    let responses: Book[];
    await axios.get<Book[]>(urlBook).then((response) => {
      responses = response.data.sort((a, b) => {
        let dateA = new Date(a.released);
        let dateB = new Date(b.released);
        if (dateA > dateB) {
          return 1;
        } else {
          return -1;
        }
      });
    });

    let comments = await CommentRepository.getAllCommentCount();

    let commentsObj = {};

    comments.forEach((element) => {
      commentsObj[element.id] = element;
    });

    responses.forEach((books, index, arr) => {
      let urlSplit: string[] = books.url.split("/");
      let id = parseInt(urlSplit[urlSplit.length - 1]);

      arr[index] = new Book(
        books.url,
        books.name,
        books.authors,
        comments[id] ? comments[id].commentCount : 0,
        books.released
      );
    });

    return responses;
  },
  async fetchOneBook(parameters: any) {
    const { error } = utils.validateId(parameters);
    if (error) {
      let returnError = Error;
      returnError.message = error.details[0].message;
      returnError.statusCode = 422;

      throw returnError;
    }

    let individualUrlBook = urlBook + "/" + parameters;
    let comment = await CommentRepository.getCommentCount(Number(parameters));
    let responses: Book;
    await axios.get<Book>(individualUrlBook).then((response) => {
      responses = response.data;
    });

    responses = new Book(
      responses.url,
      responses.name,
      responses.authors,
      comment != null ? comment.commentCount : 0,
      responses.released
    );

    return responses;
  },
  async fetchBookComment(parameters: any) {
    const { error } = utils.validateId(parameters);
    if (error) {
      let returnError = Error;
      returnError.message = error.details[0].message;
      returnError.statusCode = 422;

      throw returnError;
    }

    let responses = await CommentRepository.getBookComments(
      parseInt(parameters)
    );

    return responses;
  },
};
