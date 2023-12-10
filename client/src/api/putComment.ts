const putComment = async (
  questionId: number,
  answerId: number,
  commentId: number,
  comment: string
) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/api/questions/${questionId}/answers/${answerId}/comments/${commentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("customJWT")}`,
      },
      // credentials: "include",
      body: JSON.stringify({ comment }),
    }
  );
  // console.log("putComment response:", response);
  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText} : editAnswer failed`
    );
  }
  const data = await response.json();
  // console.log("putComment data:", data);
  return data;
};

export default putComment;
