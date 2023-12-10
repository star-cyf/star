import React from "react";

declare module "@mui/material/styles" {
  // eslint-disable-next-line no-unused-vars
  interface TypographyVariants {
    pageTitle: React.CSSProperties;
    questionTitle: React.CSSProperties;
    questionBody: React.CSSProperties;
    questionFormTitle: React.CSSProperties;
    answerTitle: React.CSSProperties;
    answerSubtitles: React.CSSProperties;
    answerBody: React.CSSProperties;
    answerFormTitle: React.CSSProperties;
    commentTitle: React.CSSProperties;
    commentBody: React.CSSProperties;
    commentFormTitle: React.CSSProperties;
    heroMainCardTitle: React.CSSProperties;
    heroMainCardBody: React.CSSProperties;
    tableTitle: React.CSSProperties;
    heroSubCardTitle: React.CSSProperties;
    heroSubCardSubtitle: React.CSSProperties;
    heroSubCardSlogan: React.CSSProperties;
    aboutTitle: React.CSSProperties;
    aboutSubtitle: React.CSSProperties;
    aboutTitleSubtext: React.CSSProperties;
    aboutwhatsubtitle: React.CSSProperties;
    aboutWhatBody: React.CSSProperties;
    aboutWhenSubtext: React.CSSProperties;
    aboutWhenLink: React.CSSProperties;
    aboutHowSubtext: React.CSSProperties;
    aboutHowBulletPoint: React.CSSProperties;
    aboutExampleTitle: React.CSSProperties;
    aboutExampleQuestion: React.CSSProperties;
    aboutExampleStarSubtitle: React.CSSProperties;
    aboutExampleBody: React.CSSProperties;
  }

  // allow configuration using "createTheme"
  // eslint-disable-next-line no-unused-vars
  interface TypographyVariantsOptions {
    pageTitle?: React.CSSProperties;
    questionTitle?: React.CSSProperties;
    questionBody?: React.CSSProperties;
    questionFormTitle?: React.CSSProperties;
    answerTitle?: React.CSSProperties;
    answerSubtitles?: React.CSSProperties;
    answerBody?: React.CSSProperties;
    answerFormTitle?: React.CSSProperties;
    commentTitle?: React.CSSProperties;
    commentBody?: React.CSSProperties;
    commentFormTitle?: React.CSSProperties;
    heroMainCardTitle?: React.CSSProperties;
    heroMainCardBody?: React.CSSProperties;
    tableTitle?: React.CSSProperties;
    heroSubCardTitle?: React.CSSProperties;
    heroSubCardSubtitle?: React.CSSProperties;
    heroSubCardSlogan?: React.CSSProperties;
    aboutTitle?: React.CSSProperties;
    aboutSubtitle?: React.CSSProperties;
    aboutTitleSubtext?: React.CSSProperties;
    aboutwhatsubtitle?: React.CSSProperties;
    aboutWhatBody?: React.CSSProperties;
    aboutWhenSubtext?: React.CSSProperties;
    aboutWhenLink?: React.CSSProperties;
    aboutHowSubtext?: React.CSSProperties;
    aboutHowBulletPoint?: React.CSSProperties;
    aboutExampleTitle?: React.CSSProperties;
    aboutExampleQuestion?: React.CSSProperties;
    aboutExampleStarSubtitle?: React.CSSProperties;
    aboutExampleBody?: React.CSSProperties;
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
