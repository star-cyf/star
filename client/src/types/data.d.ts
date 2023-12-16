// User
export interface UserData {
  id: number;
  googleId: string;
  roleId: number;
  firstName: string;
  lastName?: string;
  email: string;
  picture?: string;
  createdAt: string;
  updatedAt: string;
}

// Question
export interface QuestionData {
  id: number;
  userId: number;
  question: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  answers?: AnswerData[];
  user?: UserData;
}

// Answer
export interface AnswerData {
  id: number;
  userId: number;
  questionId: number;
  likes: number;
  situation: string;
  task: string;
  action: string;
  result: string;
  createdAt: string;
  updatedAt: string;
  comments: CommentData[];
  user?: UserData;
}

// Comment
export interface CommentData {
  id: number;
  userId: number;
  questionId: number;
  answerId: number;
  comment: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  user?: UserData;
}
