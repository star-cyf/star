import { QueryKey } from "@tanstack/react-query";
import { QuestionData, AnswerData, CommentData, UserData } from "../types/data";

export interface GetQuestionsByUserIdProps {
  userId: UserData["id"];
  sort: string;
}

export interface GetQuestionsByPage {
  pageParam: number;
  queryKey: QueryKey;
}

export interface GetQuestionsBySearchProps {
  pageParam: number;
  queryKey: QueryKey;
}

export interface GetQuestionByIdProps {
  questionId: QuestionData["id"];
  sort: string;
}

export interface PostQuestionProps {
  question: QuestionData["question"];
}

export interface PostAnswerProps {
  questionId: QuestionData["id"];
  answer: Pick<AnswerData, "situation" | "task" | "action" | "result">;
}

export interface PostCommentProps {
  questionId: QuestionData["id"];
  answerId: AnswerData["id"];
  comment: CommentData["comment"];
}

export interface PutQuestionProps {
  questionId: QuestionData["id"];
  question: QuestionData["question"];
}

export interface PutAnswerProps {
  questionId: QuestionData["id"];
  answerId: AnswerData["id"];
  answer: Pick<AnswerData, "situation" | "task" | "action" | "result">;
}

export interface PutCommentProps {
  questionId: QuestionData["id"];
  answerId: AnswerData["id"];
  commentId: CommentData["id"];
  comment: CommentData["comment"];
}

export interface DeleteQuestionProps {
  questionId: QuestionData["id"];
}

export interface DeleteAnswerProps {
  questionId: QuestionData["id"];
  answerId: AnswerData["id"];
}

export interface DeleteCommentProps {
  questionId: QuestionData["id"];
  answerId: AnswerData["id"];
  commentId: CommentData["id"];
}
