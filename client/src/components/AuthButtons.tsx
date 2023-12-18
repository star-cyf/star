import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Box, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../context/AuthContext";

const AuthButtons = () => {
  const { authenticatedUser, login, logout } = useContext(AuthContext)!; // non null assertion operator

  return (
    <Box marginLeft={{ xs: "inherit", sm: "auto" }} display={"flex"} gap={1}>
      {authenticatedUser && authenticatedUser.roleId === 1 && (
        <Button component={NavLink} to={"/verify"} variant="contained">
          Verify
        </Button>
      )}
      {authenticatedUser ? (
        <Button
          size={"small"}
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={logout}>
          Logout
        </Button>
      ) : (
        <Button
          size={"small"}
          variant="contained"
          startIcon={<LoginIcon />}
          onClick={login}>
          Login
        </Button>
      )}
    </Box>
  );
};

export default AuthButtons;
