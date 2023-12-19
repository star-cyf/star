import { QuestionData, AnswerData } from "../types/data";

const postAnswer = async (
  questionId: QuestionData["id"],
  answer: {
    situation: AnswerData["situation"];
    task: AnswerData["task"];
    action: AnswerData["action"];
    result: AnswerData["result"];
  }
) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/questions/${questionId}/answers`,
    {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${localStorage.getItem("customJWT")}`,
      // },
      credentials: "include",
      body: JSON.stringify(answer),
    }
  );
  // console.log("postAnswer response", response);
  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText} : postAnswer failed`
    );
  }
  const data = await response.json();
  // console.log("postAnswer data", data);
  return data;
};

export default postAnswer;
