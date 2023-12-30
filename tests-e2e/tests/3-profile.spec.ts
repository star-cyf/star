import { test, type Page } from "@playwright/test";
import {
  QuestionObjType,
  dummyData,
  editedDummyData,
} from "./utils/dummy-data";
import { ProfilePage } from "./pages/profile";

// test.use({
//   launchOptions: {
//     slowMo: 500,
//   },
// });

// ------------------------------------------------------------------
// Same Page Model: Generate a window and run all the tests
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// CRUD
// Check that creating, reading, updating, deleting Questions works correctly
// ------------------------------------------------------------------
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

  // [1] Create 3 new Questions
  test("Can create a new Question", async () => {
    await page.locator('a[href="/questions"]').click();
    questionId = await profilePage.createAQuestion(dummyData.question);
  });

  // [2] Edit the 3 newly Created Questions
  test("Can Edit the Created Question", async () => {
    await page.locator('a[href="/profile"]').click();
    await profilePage.editAQuestion(questionId, editedDummyData.question);
  });

  // [3] Delete the 3 newly Created and Edited Questions
  test("Can Delete the Edited Question", async () => {
    await profilePage.deleteAQuestion(questionId, editedDummyData.question);
  });
});

// ------------------------------------------------------------------
// SORT + CRUD
// Check the Sort feature works correctly with `created` and `updated`
// ------------------------------------------------------------------
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

  // [2] Edit the 3 newly Created Questions
  test("Can Edit the 3 Created Questions & can sort by updatedTime", async () => {
    editedObj = await profilePage.editMultiQuestion(obj);
  });

  // [3] Delete the 3 newly Created and Edited Questions
  test("Can Delete the 3 Edited Questions", async () => {
    await profilePage.deleteMultiQuestion(editedObj!);
  });
});
