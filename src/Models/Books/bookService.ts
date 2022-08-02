import axios from "axios";
import { Book } from "./books";
import { url } from "../../Utils/Strings";

let urlBook: string = url + "/books";

export class BookService {
  async fetchBooks(response: any) {
    try {
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
    } catch (exception) {
      if (exception.response != null && exception.response.status == 404) {
        response.status(404);
        return;
      } else {
        response.status(500);
        return;
      }
    }
  }

  async fetchOneBook(parameters: string, response: any) {
    try {
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
        0,
        responses.released
      );

      return responses;
    } catch (exception) {
      if (exception.response != null && exception.response.status == 404) {
        response.status(404);
        return;
      } else if (exception == 422) {
        response.status(422);
      } else {
        response.status(500);
        return;
      }
    }
  }
}
