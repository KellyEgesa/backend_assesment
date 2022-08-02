import axios from "axios";
import { Characters } from "./characters";
export class CharacterService {
  async fetchCharacters(parameters: string) {
    let url: string = "https://anapioficeandfire.com/api/characters";
    if (parameters != "") {
      parameters = "/" + parameters;
      url += parameters;
    }

    try {
      let responses: Characters[];
      responses = (await axios.get(url)).data;
      return responses;
    } catch (exception) {
      console.log(exception);
      return "Error";
    }
  }
}
