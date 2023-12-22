interface DummyData {
  random: string;
  question: string;
  answer: {
    [key: string]: string;
  };
  comment: string;
}

const random = "#" + Math.random().toString(16).slice(2, 8);

export const dummyData: DummyData = {
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

export const editedDummyData: Omit<DummyData, "random"> = {
  question: `This is a test Question, edited ${dummyData.random}`,
  answer: {
    situation: `This is a test Situation, edited ${dummyData.random}`,
    task: `This is a test Task, edited ${dummyData.random}`,
    action: `This is a test Action, edited ${dummyData.random}`,
    result: `This is a test Result, edited ${dummyData.random}`,
  },
  comment: `This is a test Comment, edited ${dummyData.random}`,
};
