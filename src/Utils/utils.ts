import Joi from "joi";
import { Error as localError } from "./error";
import { notFound, serverError } from "./Strings";

export const utils = {
  validateComment(user) {
    const schema = Joi.object({
      bookId: Joi.number().min(1).required(),
      content: Joi.string().min(1).max(500).required(),
    });
    return schema.validate(user);
  },

  validateId(param) {
    const schema = Joi.number().required();

    return schema.validate(param);
  },

  errorFunction(exception) {
    let returnError = localError;
    console.log(exception);
    if (exception.message != null && exception.statusCode != null) {
      return exception;
    } else if (exception.response != null && exception.response.status == 404) {
      returnError.message = notFound;
      returnError.statusCode = 404;
    } else {
      returnError.message = serverError;
      returnError.statusCode = 500;
    }

    return returnError;
  },
};
