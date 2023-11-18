import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import SignOutIcon from "@mui/icons-material/ExitToApp";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  // const { user, login, logout } = useContext(AuthContext);
  // const navigate = useNavigate();
  // const [right, setRight] = useState(false);

  // function toggleDrawer(open) {
  //   return (event) => {
  //     if (
  //       event.type === "keydown" &&
  //       (event.key === "Tab" || event.key === "Shift")
  //     ) {
  //       return;
  //     }
  //     setRight(open);
  //   };
  // }

  // const getIconByLabel = (label) => {
  //   switch (label) {
  //     case "Dashboard":
  //       return <DashboardIcon />;
  //     case "Home":
  //       return <HomeIcon />;
  //     case "Delete Account":
  //       return <DeleteIcon />;
  //     case "Sign Out":
  //       return <SignOutIcon />;
  //     default:
  //       return null;
  //   }
  // };

  // const list = () => (
  //   <Box
  //     sx={{ width: 250 }}
  //     role="presentation"
  //     onClick={toggleDrawer(false)}
  //     onKeyDown={toggleDrawer(false)}>
  //     <Divider />
  //     <List>
  //       <>
  //         <ListItem key="Dashboard" disablePadding>
  //           <ListItemButton onClick={() => navigate("/profile")}>
  //             <ListItemIcon>{getIconByLabel("Dashboard")}</ListItemIcon>
  //             <ListItemText primary={"Profile"} />
  //           </ListItemButton>
  //         </ListItem>
  //         <ListItem key="Home" disablePadding>
  //           <ListItemButton onClick={() => navigate("/")}>
  //             <ListItemIcon>{getIconByLabel("Home")}</ListItemIcon>
  //             <ListItemText primary="Home" />
  //           </ListItemButton>
  //         </ListItem>
  //         <ListItem key="About" disablePadding>
  //           <ListItemButton onClick={() => navigate("/about")}>
  //             <ListItemIcon>{getIconByLabel("About")}</ListItemIcon>
  //             <ListItemText primary="About" />
  //           </ListItemButton>
  //         </ListItem>
  //         <ListItem key="Delete Account" disablePadding>
  //           <ListItemButton onClick={handleDeleteProfile}>
  //             <ListItemIcon>{getIconByLabel("Delete Account")}</ListItemIcon>
  //             <ListItemText primary="Delete Account" />
  //           </ListItemButton>
  //         </ListItem>
  //         <ListItem key="Log Out" disablePadding>
  //           <ListItemButton onClick={() => logout()}>
  //             <ListItemIcon>{getIconByLabel("Log Out")}</ListItemIcon>
  //             <ListItemText primary="Log Out" />
  //           </ListItemButton>
  //         </ListItem>
  //       </>
  //     </List>
  //   </Box>
  // );

  return (
    <>
      <div>Sidebar</div>
      {/* <div>
        <h2>Sidebar</h2>
      </div>
      <Avatar
        onClick={toggleDrawer(true)}
        alt="profile picture"
        sx={{
          cursor: "pointer",
          width: 50,
          height: 50,
          "&:hover": {
            boxShadow: "0 0 0 5px #D3D3D3",
          },
        }}
        src={user?.picture}
      />
      <Drawer anchor="right" open={right} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer> */}
    </>
  );
};

export default Sidebar;
