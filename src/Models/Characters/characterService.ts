import axios from "axios";
import { url } from "../../Utils/Strings";
import { Character } from "./characters";

let urlCharacter: string = url + "/characters";
export class CharacterService {
  async fetchCharacters(response: any) {
    try {
      let responses: Character[];
      await axios.get<Character[]>(urlCharacter).then((response) => {
        responses = response.data;
      });

      // responses.forEach((books, index, arr) => {
      //   arr[index] = new Book(
      //     books.url,
      //     books.name,
      //     books.authors,
      //     0,
      //     books.released
      //   );
      // });
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
