export type DummyData = {
  question: string;
  answer: Record<string, string>;
  comment: string;
};

export type AnswerType = DummyData["answer"];

export type QuestionObjType = {
  id: string[];
  text: string[];
};

const random = "#" + Math.random().toString(16).slice(2, 8);

export const dummyData: DummyData = {
  question: `${random} This is a test Question`,
  answer: {
    situation: `${random} This is a test Situation`,
    task: `${random} This is a test Task`,
    action: `${random} This is a test Action`,
    result: `${random} This is a test Result`,
  },
  comment: `${random} This is a test Comment`,
};

export const editedDummyData: DummyData = {
  question: `${dummyData.question}, edited`,
  answer: {
    situation: `${dummyData.answer.situation}, edited`,
    task: `${dummyData.answer.task}, edited`,
    action: `${dummyData.answer.action}, edited`,
    result: `${dummyData.answer.result}, edited`,
  },
  comment: `${dummyData.comment}, edited`,
};
