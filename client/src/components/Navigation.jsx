import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Box, Button } from "@mui/material";
import LoginLogoutButton from "./LoginLogoutButton";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  // get the userCookie from AuthContext
  const { userCookie } = useContext(AuthContext);

  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={1}>
      <Button component={NavLink} to={"/"} variant="contained">
        Home
      </Button>
      <Button component={NavLink} to={"/about"} variant="contained">
        About
      </Button>
      {userCookie && (
        <>
          <Button component={NavLink} to={"/profile"} variant="contained">
            Profile
          </Button>
          <Button component={NavLink} to={"/questions"} variant="contained">
            Questions
          </Button>
          <Button component={NavLink} to={"/users"} variant="contained">
            Users
          </Button>
        </>
      )}
      <LoginLogoutButton />
    </Box>
  );
};

export default Navigation;
