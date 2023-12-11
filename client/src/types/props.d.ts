import { Dispatch, SetStateAction } from "react";

// Question Form
export type AddQuestionFormProps = {
  sort: string;
  setShowAddQuestionForm: Dispatch<SetStateAction<boolean>>;
};

export type UpdateQuestionFormProps = {
  questionId: number;
  originalQuestion: string;
  setShowUpdateQuestionForm: Dispatch<SetStateAction<boolean>>;
};

export type QuestionFormProps = AddQuestionFormProps | UpdateQuestionFormProps;

// Answer Form
export type AddAnswerFormProps = {
  questionId: number;
  setShowAddAnswerForm: Dispatch<SetStateAction<boolean>>;
};

export type UpdateAnswerFormProps = {
  questionId: number;
  answerId: number;
  originalSituation: string;
  originalTask: string;
  originalAction: string;
  originalResult: string;
  setShowUpdateAnswerForm: Dispatch<SetStateAction<boolean>>;
};

export type AnswerFormProps = AddAnswerFormProps | UpdateAnswerFormProps;

// Comment Form
export type AddCommentFormProps = {
  questionId: number;
  answerId: number;
  setShowAddCommentForm: Dispatch<SetStateAction<boolean>>;
};

export type UpdateCommentFormProps = {
  questionId: number;
  answerId: number;
  commentId: number;
  originalComment: string;
  setShowUpdateCommentForm: Dispatch<SetStateAction<boolean>>;
};

export type CommentFormProps = AddCommentFormProps | UpdateCommentFormProps;

// Search
export type SearchProps = {
  setDebouncedSearchTerm: Dispatch<SetStateAction<string>>;
};

// Sort
export type SortProps = {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
};
