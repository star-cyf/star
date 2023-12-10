import { Dispatch, SetStateAction } from "react";

export type QuestionFormProps = {
  sort: string;
  questionId: number;
  originalQuestion: string;
  setShowAddQuestionForm: Dispatch<SetStateAction<boolean>>;
  setShowUpdateQuestionForm: Dispatch<SetStateAction<boolean>>;
};

export type AddQuestionFormProps = Pick<
  QuestionFormProps,
  "setShowAddQuestionForm" | "sort"
>;

export type UpdateQuestionFormProps = Pick<
  QuestionFormProps,
  "questionId" | "originalQuestion" | "setShowUpdateQuestionForm"
>;

export type AnswerFormProps = {
  questionId: number;
  answerId: number;
  originalSituation: string;
  originalTask: string;
  originalAction: string;
  originalResult: string;
  setShowAddAnswerForm: Dispatch<SetStateAction<boolean>>;
  setShowUpdateAnswerForm: Dispatch<SetStateAction<boolean>>;
};

export type AddAnswerFormProps = Pick<
  AnswerFormProps,
  "questionId" | "setShowAddAnswerForm"
>;
export type UpdateAnswerFormProps = Pick<AnswerFormProps>;

export type CommentFormProps = {
  questionId: number;
  answerId: number;
  commentId: number;
  originalComment: string;
  setShowAddCommentForm: Dispatch<SetStateAction<boolean>>;
  setShowUpdateCommentForm: Dispatch<SetStateAction<boolean>>;
};

export type AddCommentFormProps = Pick<CommentFormProps>;
export type UpdateCommentFormProps = Pick<CommentFormProps>;

export type SearchProps = {
  setDebouncedSearchTerm: Dispatch<SetStateAction<string>>;
};

export type SortProps = {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
};
