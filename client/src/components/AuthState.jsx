import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Typography } from "@mui/material";

const AuthState = () => {
  const { token, user, userCookie } = useContext(AuthContext);

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} p={1} border={1}>
        <Typography fontSize={10} fontWeight={800}>
          Auth State:
        </Typography>
        <Typography fontSize={10} fontWeight={800}>
          token:
        </Typography>
        <Typography fontSize={10} sx={{ overflowWrap: "break-word" }}>
          {token ? token.toString() : "null"}
        </Typography>
        <Typography fontSize={10} fontWeight={800}>
          user:
        </Typography>
        <Typography fontSize={10} sx={{ overflowWrap: "break-word" }}>
          {user ? JSON.stringify(user) : "null"}
        </Typography>
        <Typography fontSize={10} fontWeight={800}>
          userCookie:
        </Typography>
        <Typography fontSize={10} sx={{ overflowWrap: "break-word" }}>
          {userCookie ? userCookie.toString() : "null"}
        </Typography>
      </Box>
    </>
  );
};

export default AuthState;
