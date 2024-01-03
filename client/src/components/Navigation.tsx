import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Box, Button } from "@mui/material";
import ServerStatus from "./ServerStatus";
import LoginLogoutButton from "./LoginLogoutButton";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  const { authenticatedUser } = useContext(AuthContext)!; // non null assertion operator

  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={1}>
      <Button size={"small"} component={NavLink} to={"/"} variant="contained">
        Home
      </Button>
      <Button
        size={"small"}
        component={NavLink}
        to={"/about"}
        variant="contained">
        About
      </Button>
      <Button
        size={"small"}
        component={NavLink}
        to={"/auth"}
        variant="contained">
        Auth
      </Button>
      {authenticatedUser && (
        <>
          <Button
            size={"small"}
            component={NavLink}
            to={"/profile"}
            variant="contained">
            Profile
          </Button>
          <Button
            size={"small"}
            component={NavLink}
            to={"/questions"}
            variant="contained">
            Questions
          </Button>
          <Button
            size={"small"}
            component={NavLink}
            to={"/users"}
            variant="contained">
            Users
          </Button>
        </>
      )}
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        gap={1}
        marginLeft={{ xs: "inherit", sm: "auto" }}>
        <ServerStatus />
        <LoginLogoutButton />
      </Box>
    </Box>
  );
};

export default Navigation;
