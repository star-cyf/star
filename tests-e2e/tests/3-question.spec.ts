import { Page, test } from "@playwright/test";
import { dummyData, editedDummyData } from "./utils/dummyData";
import { QuestionPage } from "./pages/question";
import { QuestionsPage } from "./pages/questions";

// test.use({
//   headless: false,
//   launchOptions: {
//     slowMo: 1000,
//   },
// });
/**========================================================================
 * Same Page Model: Generate a window and run all tests.
 *========================================================================**/
test.describe.serial("Create, Edit, Delete: Question, Answer, Comment", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    await page.goto("http://localhost:3000/questions");
    page = await browser.newPage();
  });

  let questionId: string;
  let answerId: string | null;
  let commentId: string | null;

  // -------- Create ----------
  // [1a] Create a new Question
  // [1b] Create a new Answer on that Question
  // [1c] Create a new Comment on that Answer

  // Because the questionId can only be generated during the test run,
  // it is not possible to simply place the page object model in the beforeAll section,
  // as is done in the questions.spec.ts file.
  test("Can create a new Question", async () => {
    const questionsPage = new QuestionsPage(page);
    questionId = await questionsPage.createAQuestion(dummyData.question);
  });

  test("Can create a new Answer", async () => {
    const questionPage = new QuestionPage(page, questionId);
    answerId = await questionPage.createAnAnswer(dummyData.answer);
  });

  test("Can create a new Comment", async () => {
    const questionPage = new QuestionPage(page, questionId);
    commentId = await questionPage.createAComment(dummyData.comment);
  });

  // -------- Edit ----------
  // [2a] Edit the newly Created Comment
  // [2b] Edit the newly Created Answer
  // [2c] Edit the newly Created Question

  test("Can Edit the Created Comment", async () => {
    const questionPage = new QuestionPage(page, questionId);
    await questionPage.editAComment(commentId!, editedDummyData.comment);
  });

  test("Can Edit the Created Answer", async () => {
    const questionPage = new QuestionPage(page, questionId);
    await questionPage.editAnAnswer(answerId!, editedDummyData.answer);
  });

  test("Can Edit the Created Question", async () => {
    const questionPage = new QuestionPage(page, questionId);
    await questionPage.editAQuestion(questionId, editedDummyData.question);
  });

  // -------- Delete ----------
  // [3a] Delete the newly Created and Edited Comment
  // [3b] Delete the newly Created and Edited Answer
  // [3c] Delete the newly Created and Edited Question

  test("Can Delete the Edited Comment", async () => {
    const questionPage = new QuestionPage(page, questionId);
    await questionPage.deleteAComment(commentId!, editedDummyData.comment);
  });

  test("Can Delete the Edited Answer", async () => {
    const questionPage = new QuestionPage(page, questionId);
    await questionPage.deleteAnAnswer(answerId!, editedDummyData.answer);
  });

  test("Can Delete the Edited Question", async () => {
    const questionPage = new QuestionPage(page, questionId);
    await questionPage.deleteAQuestion(questionId, editedDummyData.question);
  });
});

/**========================================================================
 * Different Windows Model: Generate multiple windows and run each test separately.
 *========================================================================**/
// test.describe.serial("Create, Edit, Delete: Question, Answer, Comment", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("http://localhost:3000");
//     await page.locator('a[href="/questions"]').click();
//   });

//   let questionId: string;
//   let answerId: string | null;
//   let commentId: string | null;

//   // -------- Create ----------
//   // [1a] Create a new Question
//   // [1b] Create a new Answer on that Question
//   // [1c] Create a new Comment on that Answer

//   test("Can create a new Question", async ({ page }) => {
//     const questionsPage = new QuestionsPage(page);
//     questionId = await questionsPage.createAQuestion(dummyData.question);
//   });

//   test("Can create a new Answer", async ({ page }) => {
//     const questionPage = new QuestionPage(page, questionId);
//     answerId = await questionPage.createAnAnswer(dummyData.answer);
//   });

//   test("Can create a new Comment", async ({ page }) => {
//     const questionPage = new QuestionPage(page, questionId);
//     commentId = await questionPage.createAComment(dummyData.comment);
//   });

//   // -------- Edit ----------
//   // [2a] Edit the newly Created Comment
//   // [2b] Edit the newly Created Answer
//   // [2c] Edit the newly Created Question

//   test("Can Edit the Created Comment", async ({ page }) => {
//     const questionPage = new QuestionPage(page, questionId);
//     await questionPage.editAComment(commentId!, editedDummyData.comment);
//   });

//   test("Can Edit the Created Answer", async ({ page }) => {
//     const questionPage = new QuestionPage(page, questionId);
//     await questionPage.editAnAnswer(answerId!, editedDummyData.answer);
//   });

//   test("Can Edit the Created Question", async ({ page }) => {
//     const questionPage = new QuestionPage(page, questionId);
//     await questionPage.editAQuestion(questionId, editedDummyData.question);
//   });

//   // -------- Delete ----------
//   // [3a] Delete the newly Created and Edited Comment
//   // [3b] Delete the newly Created and Edited Answer
//   // [3c] Delete the newly Created and Edited Question

//   test("Can Delete the Edited Comment", async ({ page }) => {
//     const questionPage = new QuestionPage(page, questionId);
//     await questionPage.deleteAComment(commentId!, editedDummyData.comment);
//   });

//   test("Can Delete the Edited Answer", async ({ page }) => {
//     const questionPage = new QuestionPage(page, questionId);
//     await questionPage.deleteAnAnswer(answerId!, editedDummyData.answer);
//   });

//   test("Can Delete the Edited Question", async ({ page }) => {
//     const questionPage = new QuestionPage(page, questionId);
//     await questionPage.deleteAQuestion(questionId, editedDummyData.question);
//   });
// });
