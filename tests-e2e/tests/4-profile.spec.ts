import { type Page, test, expect } from "@playwright/test";
import { QuestionObjType, dummyData, editedDummyData } from "./utils/dummyData";
import { ProfilePage } from "./pages/profile";

// test.use({
//   launchOptions: {
//     slowMo: 400,
//   },
// });

/**========================================================================
 * *                                CRUD
 *   check the feature of creating,
 *   reading, updating, deleteing of questions is working
 *========================================================================**/
/**-------------------------------------------------------
 * Same Page Model: Generate a window and run all tests.
 *-------------------------------------------------------**/
test.describe.serial("Create, Edit, Delete: Question", () => {
  let page: Page;
  let profilePage: ProfilePage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/");

    profilePage = new ProfilePage(page);
  });
  test.afterAll(async () => {
    await page.close();
  });

  let questionId: string;

  // -------- Create ----------
  // [1] Create a new Question

  test("Can create a new Question", async () => {
    await page.locator('a[href="/questions"]').click();
    questionId = await profilePage.createAQuestion(dummyData.question);
  });

  // -------- Edit ----------
  // [2] Edit the newly Created Question

  test("Can Edit the Created Question", async () => {
    await page.locator('a[href="/profile"]').click();
    await profilePage.editAQuestion(questionId, editedDummyData.question);
  });

  // -------- Delete ----------
  // [3] Delete the newly Created and Edited Question

  test("Can Delete the Edited Question", async () => {
    await profilePage.deleteAQuestion(questionId, editedDummyData.question);
  });
});

/**========================================================================
 * *                            SORT + CRUD
 *   checking the 'createdTime' and 'updatingTime' of sort feature is working
 *========================================================================**/
test.describe.serial("Create, Edit, Delete, Sort: 3 Questions", () => {
  let page: Page;
  let profilePage: ProfilePage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/");

    profilePage = new ProfilePage(page);
  });
  test.afterAll(async () => {
    await page.close();
  });

  // -------- Create ----------
  // [1] Create 3 new Questions

  const questionNum = 3;
  let obj: QuestionObjType;
  let editedObj: QuestionObjType;

  test("Can create 3 new Questions & can sort by createdTime", async () => {
    obj = await profilePage.createMultiQuestion(
      dummyData.question,
      questionNum
    );
  });

  // -------- Edit ----------
  // [2] Edit the newly Created Question

  test("Can Edit the 3 Created Questions & can sort by updatedTime", async () => {
    editedObj = await profilePage.editMultiQuestion(obj);
  });

  // -------- Delete ----------
  // [3] Delete the newly Created and Edited Question

  test("Can Delete the 3 Edited Questions", async () => {
    await profilePage.deleteMultiQuestion(editedObj!);
  });
});
