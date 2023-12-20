const random = "#" + Math.random().toString(16).slice(2, 8);
export const dummy = {
  random,
  question: `It is a question ${random}`,
  answer: {
    situation: `It is a situation ${random}`,
    task: `It is a task ${random}`,
    action: `It is a action ${random}`,
    result: `It is a result ${random}`,
  },
  comment: `It is a comment ${random}`,
};
export const editedDummy = {
  question: `It is a edited question ${dummy.random}`,
  answer: {
    situation: `It is a edited situation ${dummy.random}`,
    task: `It is a edited task ${dummy.random}`,
    action: `It is a edited action ${dummy.random}`,
    result: `It is a edited result ${dummy.random}`,
  },
  comment: `It is a edited comment ${dummy.random}`,
};
