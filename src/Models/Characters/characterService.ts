import axios from "axios";
import { url } from "../../Utils/Strings";
import { Character } from "./characters.model";

let urlCharacter: string = url + "/characters?pageSize=100";
export class CharacterService {
  async fetchCharacters(request: any, response: any) {
    try {
      let responses: Character[];
      let totalAge: number = 0;

      await axios.get<Character[]>(urlCharacter).then((response) => {
        responses = response.data;
      });

      responses.forEach((character, index, arr) => {
        arr[index] = new Character(
          character.url,
          character.name,
          character.gender,
          character.born,
          character.died,
          character.culture,
          character.playedBy
        );
      });

      if (request.query["gender"]) {
        let gender: string = request.query["gender"];
        responses = responses.filter((character) => {
          return character.gender == gender;
        });
      }

      if (request.query["sortBy"]) {
        let sortParam: string = request.query["sortBy"];
        let isAsc: boolean = request.query["OrderBy"] == "asc";
        responses.sort((a, b) => {
          if (a[sortParam] > b[sortParam]) {
            return isAsc ? 1 : -1;
          } else {
            return isAsc ? -1 : 1;
          }
        });
      }

      responses.forEach((character, index, arr) => {
        totalAge += arr[index].age;
      });

      return {
        metadata: { count: responses.length, totalAge: totalAge + " years" },
        data: responses,
      };
    } catch (exception) {
      console.log(exception);
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
