import axios from "axios";
import { Book } from "../Models/books.model";
import { url } from "../Utils/Strings";
import { CommentRepository } from "../Repository/comment.repository";

let urlBook: string = url + "/books?pageSize=100";

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

    responses.forEach((books, index, arr) => {
      arr[index] = new Book(
        books.url,
        books.name,
        books.authors,
        0,
        books.released
      );
    });

    return responses;
  },
  async fetchOneBook(parameters: string) {
    if (isNaN(Number(parameters))) throw 422;
    urlBook = urlBook + "/" + parameters;
    let responses: Book;
    await axios.get<Book>(urlBook).then((response) => {
      responses = response.data;
    });

    responses = new Book(
      responses.url,
      responses.name,
      responses.authors,
      await CommentRepository.getBookComments(Number(parameters)),
      responses.released
    );

    return responses;
  },
};
