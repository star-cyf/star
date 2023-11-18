import { Box, Link as MaterialLink } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        borderTop: 1,
        borderColor: "lightgray",
        py: 3,
      }}
      paddingRight={{ xs: 0, sm: 5, md: 10, lg: 12 }}
      paddingLeft={{ xs: 3, sm: 5, md: 10, lg: 12 }}
      flexDirection={{ xs: "column", sm: "row" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          maxWidth: "250px",
        }}></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
          lineHeight: 2,
        }}
        textAlign={{ xs: "left", sm: "right" }}>
        <MaterialLink
          href="https://github.com/fazbazjaz/star"
          target="_blank"
          underline="none"
          sx={{ color: "black", fontWeight: "bold" }}>
          Project Repository
        </MaterialLink>
      </Box>
    </Box>
  );
};

export default Footer;
