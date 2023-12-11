import { Dispatch, SetStateAction } from "react";

// Question Form
export interface AddQuestionFormProps {
  sort: string;
  setShowAddQuestionForm: Dispatch<SetStateAction<boolean>>;
}

export interface UpdateQuestionFormProps {
  questionId: number;
  originalQuestion: string;
  setShowUpdateQuestionForm: Dispatch<SetStateAction<boolean>>;
}

export type QuestionFormProps = AddQuestionFormProps & UpdateQuestionFormProps;

// Answer Form
export interface AddAnswerFormProps {
  questionId: number;
  setShowAddAnswerForm: Dispatch<SetStateAction<boolean>>;
}

export interface UpdateAnswerFormProps {
  questionId: number;
  answerId: number;
  originalSituation: string;
  originalTask: string;
  originalAction: string;
  originalResult: string;
  setShowUpdateAnswerForm: Dispatch<SetStateAction<boolean>>;
}

export type AnswerFormProps = AddAnswerFormProps & UpdateAnswerFormProps;

// Comment Form
export interface AddCommentFormProps {
  questionId: number;
  answerId: number;
  setShowAddCommentForm: Dispatch<SetStateAction<boolean>>;
}

export interface UpdateCommentFormProps {
  questionId: number;
  answerId: number;
  commentId: number;
  originalComment: string;
  setShowUpdateCommentForm: Dispatch<SetStateAction<boolean>>;
}

export type CommentFormProps = AddCommentFormProps & UpdateCommentFormProps;

// Search
export interface SearchProps {
  setDebouncedSearchTerm: Dispatch<SetStateAction<string>>;
}

// Sort
export interface SortProps {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}
