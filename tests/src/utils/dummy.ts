export interface DummyType {
  random: string;
  question: string;
  answer: {
    [key: string]: string;
  };
  comment: string;
}

export const random = "#" + Math.random().toString(16).slice(2, 8);

export const dummy: DummyType = {
  random,
  question: `This is a test Question ${random}`,
  answer: {
    situation: `This is a test Situation ${random}`,
    task: `This is a test Task ${random}`,
    action: `This is a test Action ${random}`,
    result: `This is a test Result ${random}`,
  },
  comment: `This is a test Comment ${random}`,
};

export const editedDummy: Omit<DummyType, "random"> = {
  question: `This is a test Question, edited ${dummy.random}`,
  answer: {
    situation: `This is a test Situation, edited ${dummy.random}`,
    task: `This is a test Task, edited ${dummy.random}`,
    action: `This is a test Action, edited ${dummy.random}`,
    result: `This is a test Result, edited ${dummy.random}`,
  },
  comment: `This is a test Comment, edited ${dummy.random}`,
};
