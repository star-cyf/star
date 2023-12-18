const getAllUsers = async () => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("customJWT")}`,
    },
    // credentials: "include",
  });
  // console.log("getAllUsers response:", response);
  if (!response.ok) {
    throw new Error("getAllUsers failed");
  }
  const data = await response.json();
  // console.log("getAllUsers data:", data);
  return data;
};

export default getAllUsers;
