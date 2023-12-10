const postAnswer = async (
  questionId: number,
  answer: { situation: string; task: string; action: string; result: string }
) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/questions/${questionId}/answers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("customJWT")}`,
      },
      // credentials: "include",
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
