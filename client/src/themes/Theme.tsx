import { createTheme } from "@mui/material/styles";
import { yellow, purple } from "@mui/material/colors";
import "@fontsource-variable/inter";

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
    pageTitle: {
      fontSize: "1.2rem",
      fontWeight: "500",
    },
    questionTitle: {
      fontSize: "1.2rem",
      fontWeight: "500",
    },
    questionBody: {
      fontSize: "1.25rem",
      fontWeight: "600",
    },
    questionFormTitle: {
      fontSize: "1.25rem",
      fontWeight: "500",
    },
    answerTitle: {
      fontSize: "1.2rem",
      fontWeight: "500",
    },
    answerSubtitles: {
      fontSize: "1.2rem",
      fontWeight: "500",
    },
    answerBody: {
      fontSize: "1.2rem",
      fontWeight: "500",
    },
    answerFormTitle: {
      fontSize: "1.4rem",
      fontWeight: "500",
    },
    commentTitle: {
      fontSize: "1rem",
    },
    commentBody: {
      fontSize: "1rem",
    },
    commentFormTitle: {
      fontSize: "1.2rem",
      fontWeight: "500",
    },
    heroMainCardTitle: {
      fontSize: "2.5rem",
    },
    heroMainCardBody: {
      fontSize: "1.2rem",
    },
    tableTitle: {
      fontSize: "1.1rem",
      fontWeight: "500",
    },
    heroSubCardTitle: {
      fontSize: "3rem",
      fontWeight: "600",
    },
    heroSubCardSubtitle: {
      fontSize: "2rem",
      fontWeight: "500",
    },
    heroSubCardSlogan: {
      fontSize: "1.6rem",
      fontWeight: "400",
      fontStyle: "italic",
    },
    aboutTitle: {
      fontSize: "2.6rem",
      fontWeight: "600",
    },
    aboutSubtitle: {
      fontSize: "2.2rem",
      fontWeight: "600",
    },
    aboutTitleSubtext: {
      fontSize: "1.6rem",
      fontWeight: "500",
    },
    aboutwhatsubtitle: {
      fontSize: "2rem",
      fontWeight: "500",
    },
    aboutWhatBody: {
      fontSize: "1.5rem",
      fontWeight: "400",
    },
    aboutWhenSubtext: {
      fontSize: "1.4rem",
      fontWeight: "400",
    },
    aboutWhenLink: {
      fontSize: "1.4rem",
      fontWeight: "600",
    },
    aboutHowSubtext: {
      fontSize: "1.4rem",
      fontWeight: "400",
    },
    aboutHowBulletPoint: {
      fontSize: "1.4rem",
      fontWeight: "400",
    },
    aboutExampleTitle: {
      fontSize: "2rem",
      fontWeight: "600",
    },
    aboutExampleQuestion: {
      fontSize: "1.6rem",
      fontWeight: "400",
      fontStyle: "italic",
    },
    aboutExampleStarSubtitle: {
      fontSize: "1.4rem",
      fontWeight: "500",
    },
    aboutExampleBody: {
      fontSize: "1.15rem",
      fontWeight: "400",
    },
  },
});

export default theme;
