import { Box, Container, Typography } from "@mui/material";

const Hero = () => {
  const heroBackgroundImage = "/images/background-001.jpg";

  return (
    <Box
      sx={{
        // left: 0,
        // right: 0,
        // top: 0,
        // bottom: 0,
        color: "white",
        // position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        maxHeight: 1300,
        // backgroundColor: "#7FC7D9",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBackgroundImage})`,
        backgroundSize: "cover",
        // backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}>
      <Container
        sx={{
          mt: 0,
          mb: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography color="inherit" align="center" variant="h2" marked="center">
          STAR - Situation, Task, Action and Result
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}>
          STAR solves a business problem.
        </Typography>
        <Typography>
          At CodeYourFuture, trainees keep a brag diary to build up a bank of
          examples of their skills, knowledge and capabilities.
        </Typography>
        <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
          Build your future
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;
