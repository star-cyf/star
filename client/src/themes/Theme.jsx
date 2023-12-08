import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto";
import "@fontsource-variable/inter";
import "@fontsource-variable/open-sans";
import "@fontsource-variable/raleway";
import "@fontsource/lato";
import { yellow, purple } from "@mui/material/colors";

// Installed Fonts:
// "Roboto"
// "Inter Variable"
// "Open Sans Variable"
// "Raleway Variable"
// "Lato"

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[600],
    },
    secondary: {
      main: purple[600],
    },
    text: {
      primary: "rgba(255, 255, 255, 1)",
    },
  },
  typography: {
    fontFamily: "Inter Variable",
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.75rem",
    },
    pagetitle: {
      fontSize: "1.2rem",
      fontWeight: "500",
    },
    questiontitle: {
      fontSize: "1.2rem",
      fontWeight: "500",
    },
    questionbody: {
      fontSize: "1.25rem",
      fontWeight: "600",
    },
    questionformtitle: {
      fontSize: "1.25rem",
      fontWeight: "500",
    },
    answertitle: {
      fontSize: "1.2rem",
      fontWeight: "500",
    },
    answersubtitles: {
      fontSize: "1.2rem",
      fontWeight: "500",
    },
    answerbody: {
      fontSize: "1.2rem",
      fontWeight: "500",
    },
    answerformtitle: {
      fontSize: "1.4rem",
      fontWeight: "500",
    },
    commentitle: {
      fontSize: "1rem",
    },
    commentbody: {
      fontSize: "1rem",
    },
    commentformtitle: {
      fontSize: "1.2rem",
      fontWeight: "500",
    },
    heromaincardtitle: {
      fontSize: "2.5rem",
    },
    heromaincardbody: {
      fontSize: "1.2rem",
    },
    tabletitle: {
      fontSize: "1.1rem",
      fontWeight: "500",
    },
    herosubcardtitle: {
      fontSize: "3rem",
      fontWeight: "600",
    },
    herosubcardsubtitle: {
      fontSize: "2rem",
      fontWeight: "500",
    },
    herosubcardslogan: {
      fontSize: "1.6rem",
      fontWeight: "400",
      fontStyle: "italic",
    },
  },
});

export default theme;
