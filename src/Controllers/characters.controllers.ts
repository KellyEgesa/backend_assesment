import { CharacterService } from "../Services/character.service";

async function get(req, res, next) {
  try {
    res.json(await CharacterService.fetchCharacters(req.query));
  } catch (exception) {
    if (exception.response != null && exception.response.status == 404) {
      res.status(404);
      return;
    } else {
      res.status(500);
      return;
    }
  }
}

module.exports = {
  get,
};
