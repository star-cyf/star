import { Box } from "@mui/material";
import Hero from "../components/Hero";

const HomePage = () => {
  return (
    <Box display={"grid"} gridTemplateRows={"1fr"}>
      <Hero />
    </Box>
  );
};

export default HomePage;
