import { QuestionData } from "../types/data";

const getQuestionById = async (
  questionId: QuestionData["id"],
  sort: string
) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/api/questions/${questionId}?sort=${sort}`,
    // }/api/questions/${questionId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("customJWT")}`,
      },
      // { credentials: "include" }
    }
  );
  // console.log("getQuestionById response:", response);
  if (!response.ok) {
    throw new Error("getQuestionById failed");
  }
  const data = await response.json();
  // console.log("getQuestionById data:", data);
  return data;
};

export default getQuestionById;
