import { Dispatch, SetStateAction } from "react";

/////////////////////////////////////////////////////////////////////////////////
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
export type UpdateAnswerForm = {
  questionId: number;
  answerId: number;
  originalSituation: string;
  originalTask: string;
  originalAction: string;
  originalResult: string;
  setShowUpdateAnswerForm: Dispatch<SetStateAction<boolean>>;
};
export type AddAnswerFormProps = AnswerFormId & AddAnswerForm;
export type UpdateAnswerFormProps = AnswerFormId & UpdateAnswerForm;
export type AnswerFormProps = AddAnswerFormProps | UpdateAnswerFormProps;

/////////////////////////////////////////////////////////////////////////////////
// Comment Form

export type CommentFormId = {
  questionId: number;
  answerId: number;
};
export interface AddCommentForm {
  setShowAddCommentForm: Dispatch<SetStateAction<boolean>>;
}
export interface UpdateCommentForm {
  commentId: number;
  originalComment: string;
  setShowUpdateCommentForm: Dispatch<SetStateAction<boolean>>;
}
export type AddCommentFormProps = CommentFormId & AddCommentForm;
export type UpdateCommentFormProps = CommentFormId & UpdateCommentForm;
export type CommentFormProps = AddCommentFormProps | UpdateCommentFormProps;

/////////////////////////////////////////////////////////////////////////////////
// Search
export type SearchProps = {
  setDebouncedSearchTerm: Dispatch<SetStateAction<string>>;
};

/////////////////////////////////////////////////////////////////////////////////
// Sort
export type SortProps = {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
};
