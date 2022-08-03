import Joi from "joi";

export const utils = {
  validateComment(user) {
    const schema = Joi.object({
      bookId: Joi.string().min(1).required(),
      content: Joi.string().min(1).max(500).required(),
    });
    return schema.validate(user);
  },
};
