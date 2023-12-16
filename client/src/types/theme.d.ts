import { CSSProperties } from "react";

declare module "@mui/material/styles" {
  // eslint-disable-next-line no-unused-vars
  interface TypographyVariants {
    pageTitle: CSSProperties;
    questionTitle: CSSProperties;
    questionBody: CSSProperties;
    questionFormTitle: CSSProperties;
    answerTitle: CSSProperties;
    answerSubtitles: CSSProperties;
    answerBody: CSSProperties;
    answerFormTitle: CSSProperties;
    commentTitle: CSSProperties;
    commentBody: CSSProperties;
    commentFormTitle: CSSProperties;
    heroMainCardTitle: CSSProperties;
    heroMainCardBody: CSSProperties;
    tableTitle: CSSProperties;
    heroSubCardTitle: CSSProperties;
    heroSubCardSubtitle: CSSProperties;
    heroSubCardSlogan: CSSProperties;
    aboutTitle: CSSProperties;
    aboutSubtitle: CSSProperties;
    aboutTitleSubtext: CSSProperties;
    aboutwhatsubtitle: CSSProperties;
    aboutWhatBody: CSSProperties;
    aboutWhenSubtext: CSSProperties;
    aboutWhenLink: CSSProperties;
    aboutHowSubtext: CSSProperties;
    aboutHowBulletPoint: CSSProperties;
    aboutExampleTitle: CSSProperties;
    aboutExampleQuestion: CSSProperties;
    aboutExampleStarSubtitle: CSSProperties;
    aboutExampleBody: CSSProperties;
  }

  // allow configuration using "createTheme"
  // eslint-disable-next-line no-unused-vars
  interface TypographyVariantsOptions {
    pageTitle?: CSSProperties;
    questionTitle?: CSSProperties;
    questionBody?: CSSProperties;
    questionFormTitle?: CSSProperties;
    answerTitle?: CSSProperties;
    answerSubtitles?: CSSProperties;
    answerBody?: CSSProperties;
    answerFormTitle?: CSSProperties;
    commentTitle?: CSSProperties;
    commentBody?: CSSProperties;
    commentFormTitle?: CSSProperties;
    heroMainCardTitle?: CSSProperties;
    heroMainCardBody?: CSSProperties;
    tableTitle?: CSSProperties;
    heroSubCardTitle?: CSSProperties;
    heroSubCardSubtitle?: CSSProperties;
    heroSubCardSlogan?: CSSProperties;
    aboutTitle?: CSSProperties;
    aboutSubtitle?: CSSProperties;
    aboutTitleSubtext?: CSSProperties;
    aboutwhatsubtitle?: CSSProperties;
    aboutWhatBody?: CSSProperties;
    aboutWhenSubtext?: CSSProperties;
    aboutWhenLink?: CSSProperties;
    aboutHowSubtext?: CSSProperties;
    aboutHowBulletPoint?: CSSProperties;
    aboutExampleTitle?: CSSProperties;
    aboutExampleQuestion?: CSSProperties;
    aboutExampleStarSubtitle?: CSSProperties;
    aboutExampleBody?: CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  // eslint-disable-next-line no-unused-vars
  interface TypographyPropsVariantOverrides {
    pageTitle: true;
    questionTitle: true;
    questionBody: true;
    questionFormTitle: true;
    answerTitle: true;
    answerSubtitles: true;
    answerBody: true;
    answerFormTitle: true;
    commentTitle: true;
    commentBody: true;
    commentFormTitle: true;
    heroMainCardTitle: true;
    heroMainCardBody: true;
    tableTitle: true;
    heroSubCardTitle: true;
    heroSubCardSubtitle: true;
    heroSubCardSlogan: true;
    aboutTitle: true;
    aboutSubtitle: true;
    aboutTitleSubtext: true;
    aboutwhatsubtitle: true;
    aboutWhatBody: true;
    aboutWhenSubtext: true;
    aboutWhenLink: true;
    aboutHowSubtext: true;
    aboutHowBulletPoint: true;
    aboutExampleTitle: true;
    aboutExampleQuestion: true;
    aboutExampleStarSubtitle: true;
    aboutExampleBody: true;
  }
}
