import { database } from "../database/connection";
import { questions, users } from "../database/schema";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

export const addQuestion = async (req: Request, res: Response) => {
  try {
    const user = req.customJWTPayload;
    // console.log("addQuestion user:", user);

    if (!user) {
      return res.status(500).json({ error: "No User attached to the Request" });
    }

    const question = req.body.question;
    // console.log("addQuestion question:", question);

    if (!question) {
      return res.status(400).json({ error: "No Question on the Request Body" });
    }

    const userGoogleId = user.google_id;
    // console.log("addQuestion userGoogleId:", userGoogleId);

    const userQuery = await database
      .select({ id: users.id })
      .from(users)
      .where(eq(users.google_id, userGoogleId));
    // console.log("addQuestion userQuery:", userQuery);

    const userId = userQuery[0].id;
    // console.log("addQuestion userId:", userId);

    const insertQuestionQuery = await database
      .insert(questions)
      .values({ userId, question })
      .returning();
    // console.log("addQuestion insertQuestionQuery:", insertQuestionQuery);

    const data = insertQuestionQuery[0];
    // console.log("addQuestion payload:", payload);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const query = await database.select().from(questions);
    // console.log("getAllQuestions query:", query);

    const data = query;
    // console.log("getAllQuestions data:", data);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const findAllQuestionsByUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  // console.log("findAllQuestionsByUser userId:", userId);

  try {
    const query = await database
      .select()
      .from(questions)
      .where(eq(questions.userId, userId));
    // console.log("findAllQuestionsByUser query:", query);

    const data = query;
    // console.log("findAllQuestionsByUser data:", data);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const findOneQuestion = async (req: Request, res: Response) => {
  const questionId = parseInt(req.params.questionId);
  // console.log("findOneQuestion questionId:", questionId);

  try {
    const query = await database
      .select()
      .from(questions)
      .where(eq(questions.id, questionId));
    // console.log("findOneQuestion query:", query);

    const data = query[0];
    // console.log("findOneQuestion data:", data);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
