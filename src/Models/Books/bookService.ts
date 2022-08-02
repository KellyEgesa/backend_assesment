import axios from "axios";
import { Book } from "./books";

export class BookService {
  async fetchBooks(parameters: string, response: any) {
    let url: string = "https://anapioficeandfire.com/api/books";
    if (parameters != "") {
      parameters = "/" + parameters;
      url += parameters;
    }

    try {
      let responses: Book[];
      await axios.get<Book[]>(url).then((response) => {
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
}
