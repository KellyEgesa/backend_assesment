import axios from "axios";
import { url } from "../Utils/Strings";
import { Character } from "../Models/characters.model";

let urlCharacter: string = url + "/characters?pageSize=100";
export const CharacterService = {
  async fetchCharacters(reqObject) {
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

    if (reqObject["gender"]) {
      let gender: string = reqObject["gender"];
      responses = responses.filter((character) => {
        return character.gender == gender;
      });
    }

    if (reqObject["sortBy"]) {
      let sortParam: string = reqObject["sortBy"];
      let isAsc: boolean = reqObject["OrderBy"] == "asc";
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
  },
};
