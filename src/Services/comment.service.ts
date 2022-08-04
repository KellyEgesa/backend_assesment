import { url } from "../Utils/Strings";
import { CommentRepository } from "../Repository/comment.repository";
import { utils } from "../Utils/utils";
import { Error } from "../Utils/error";

export const CommentService = {
  async fetchComments() {
    let responses = await CommentRepository.fetchAllComments();
    return responses;
  },

  async createComment(requestParams: any) {
    const { error } = utils.validateComment(requestParams.body);

    if (error) {
      let returnError = Error;
      returnError.message = error.details[0].message;
      returnError.statusCode = 400;

      throw returnError;
    }

    const ipAddress: string = requestParams.socket.remoteAddress
      .split(":")
      .pop();

    let newComment = await CommentRepository.addComment(
      requestParams.body.bookId,
      requestParams.body.content,
      ipAddress
    );

    return newComment;
  },
};
