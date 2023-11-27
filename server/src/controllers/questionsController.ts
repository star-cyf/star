import { Request, Response } from "express";
import {
  createQuestion,
  getAllQuestions,
  deleteQuestion,
  getAllQuestionsByUser,
  getOneQuestionWithAnswersAndComments,
  getOneQuestion,
  createAnswer,
  createComment,
  getAnswer
} from "../helpers/questions";
import { logger } from "../logger";

export const addQuestionHandler = async (req: Request, res: Response) => {
  try {
    const user = req.customJWTPayload;
    logger.info({ message: "addQuestionHandler user", value: user });

    if (!user) {
      return res.status(500).json({ error: "No User attached to the Request" });
    }

    const question = req.body.question;
    logger.info({ message: "addQuestionHandler question ", value: question });

    if (!question) {
      return res.status(400).json({ error: "No Question on the Request Body" });
    }

    const userId = user.id;
    logger.info({ message: "addQuestionHandler userId", value: userId });

    const queryQuestion = await createQuestion(userId, question);
    logger.info({
      message: "addQuestionHandler queryQuestion",
      value: queryQuestion
    });

    res.status(200).json(queryQuestion);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getAllQuestionsHandler = async (req: Request, res: Response) => {
  try {
    const query = await getAllQuestions();
    logger.info("getAllQuestionsHandler query", query);

    const data = query;
    logger.info({
      message: "getAllQuestionsHandler data",
      value: data
    });

    res.status(200).json(data);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const deleteQuestionHandler = async (req: Request, res: Response) => {
  try {
    const questionId = parseInt(req.params.id);
    logger.info({
      message: "deleteQuestionHandler questionId",
      value: questionId
    });

    if (!questionId) {
      return res.status(400).json({ error: "No questionId provided" });
    }

    if (isNaN(questionId)) {
      return res.status(400).json({ error: "Invalid questionId format" });
    }

    const deleteQuery = await deleteQuestion(questionId);
    logger.info({
      message: "deleteQuestionHandler deleteQuery",
      value: deleteQuery
    });

    res.status(200).json(deleteQuery);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const findAllQuestionsByUserHandler = async (
  req: Request,
  res: Response
) => {
  const userId = parseInt(req.params.id);
  logger.info({
    message: "findAllQuestionsByUserHandler userId",
    value: userId
  });

  try {
    const query = await getAllQuestionsByUser(userId);
    logger.info({
      message: "findAllQuestionsByUserHandler query",
      value: query
    });

    const data = query;
    logger.info({
      message: "findAllQuestionsByUserHandler data",
      value: data
    });

    res.status(200).json(data);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const findOneQuestionHandler = async (req: Request, res: Response) => {
  const questionId = parseInt(req.params.id);
  logger.info({
    message: "findOneQuestionHandler questionId",
    value: questionId
  });

  try {
    const query = await getOneQuestionWithAnswersAndComments(questionId);
    logger.info({
      message: "findOneQuestionHandler query",
      value: query
    });

    if (!query || query.length === 0) {
      res.status(404).json({ error: "No Question Found" });
      return;
    }

    const data = query[0];
    logger.info({
      message: "findOneQuestionHandler data",
      value: data
    });

    res.status(200).json(data);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const createAnswerHandler = async (req: Request, res: Response) => {
  const questionId = Number(req.params.id);
  logger.info({
    message: "createAnswerHandler questionId",
    value: questionId
  });

  if (!questionId) {
    return res.status(401).json({ error: "You did not include a Question ID" });
  }

  const { situation, task, action, result } = req.body;
  logger.info({
    message: "createAnswerHandler req.body",
    value: req.body
  });

  if (!situation || !task || !action || !result) {
    return res.status(401).json({ error: "Your Answer was not Complete" });
  }

  try {
    const questionIdQuery = await getOneQuestion(questionId);
    logger.info({
      message: "createAnswerHandler questionIdQuery",
      value: questionIdQuery
    });

    if (!questionIdQuery || questionIdQuery.length === 0) {
      return res
        .status(401)
        .json({ error: `There is no Question with ID ${questionId}` });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }

  try {
    const insertAnswerQuery = await createAnswer(
      questionId,
      situation,
      task,
      action,
      result
    );
    logger.info({
      message: "createAnswerHandler insertAnswerQuery",
      value: insertAnswerQuery
    });

    const data = insertAnswerQuery[0];
    logger.info({
      message: "createAnswerHandler data",
      value: data
    });

    res.status(200).json(data);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Error Adding Your Answer to the Database" });
  }
};

export const createCommentHandler = async (req: Request, res: Response) => {
  const questionId = parseInt(req.params.id);
  logger.info({
    message: "createCommentHandler questionId",
    value: questionId
  });

  if (!questionId) {
    return res.status(400).json({ error: `Invalid Question ID Provided` });
  }

  const answerId = parseInt(req.params.answerId);
  logger.info({
    message: "createCommentHandler answerId",
    value: answerId
  });

  if (!answerId) {
    return res.status(400).json({ error: `Invalid Answer ID Provided` });
  }

  const comment = req.body.comment;
  logger.info({
    message: "createCommentHandler comment",
    value: comment
  });

  if (!comment) {
    return res.status(400).json({ error: `Invalid Comment Provided` });
  }

  try {
    const answerQuery = await getAnswer(questionId, answerId);
    logger.info({
      message: "createCommentHandler answerQuery",
      value: answerQuery
    });

    if (!answerQuery || answerQuery.length === 0) {
      return res.status(404).json({ error: "Answer not found" });
    }

    const insertCommentQuery = await createComment(answerId, comment);
    logger.info({
      message: "createCommentHandler insertCommentQuery",
      value: insertCommentQuery
    });

    const data = insertCommentQuery[0];
    logger.info({
      message: "createCommentHandler data",
      value: data
    });

    res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error Adding Your Comment to the Database" });
  }
};
