import { useState } from "react";
import { AppBar, Box, Typography } from "@mui/material";

const Header = () => {
  const [headerText, setHeaderText] = useState("STAR");

  return (
    <AppBar sx={{ background: "white", color: "black", position: "static" }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={{ xs: "column", md: "row" }}
        gap={{ xs: 2, md: 5 }}
        border={1}
        borderColor={"black"}
        px={{ xs: 2, md: 4, lg: 4 }}
        py={{ xs: 2, md: 2, lg: 2 }}>
        <Typography variant="h2">{headerText}</Typography>
      </Box>
    </AppBar>
  );
};

export default Header;
