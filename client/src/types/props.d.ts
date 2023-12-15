import { Dispatch, SetStateAction } from "react";
import CommentForm from "../components/CommentForm";

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

export type QuestionFormProps = AddQuestionFormProps | UpdateQuestionFormProps;

/////////////////////////////////////////////////////////////////////////////////
// Answer Form
export interface AnswerFormId {
  questionId: number;
}
export interface AddAnswerForm {
  setShowAddAnswerForm: Dispatch<SetStateAction<boolean>>;
}

export interface UpdateAnswerForm {
  answerId: number;
  originalSituation: string;
  originalTask: string;
  originalAction: string;
  originalResult: string;
  setShowUpdateAnswerForm: Dispatch<SetStateAction<boolean>>;
}

export type AnswerFormProps = AddAnswerFormProps | UpdateAnswerFormProps;

/////////////////////////////////////////////////////////////////////////////////
// Comment Form
export interface CommentFormId {
  questionId: number;
  answerId: number;
}
export interface AddCommentForm {
  setShowAddCommentForm: Dispatch<SetStateAction<boolean>>;
}
export interface UpdateCommentForm {
  commentId: number;
  originalComment: string;
  setShowUpdateCommentForm: Dispatch<React.SetStateAction<boolean>>;
}
export type AddCommentFormProps = CommentFormId & AddCommentForm;
export type UpdateCommentFormProps = CommentFormId & UpdateCommentForm;
export type CommentFormProps = AddCommentFormProps | UpdateCommentFormProps;

/////////////////////////////////////////////////////////////////////////////////
// Search
export interface SearchProps {
  setDebouncedSearchTerm: Dispatch<SetStateAction<string>>;
}

/////////////////////////////////////////////////////////////////////////////////
// Sort
export interface SortProps {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}
