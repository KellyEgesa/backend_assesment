import { CharacterService } from "../Services/character.service";
import { utils } from "../Utils/utils";

async function get(req, res, next) {
  try {
    res.json(await CharacterService.fetchCharacters(req.query));
  } catch (exception) {
    next(utils.errorFunction(exception));
  }
}

module.exports = {
  get,
};
