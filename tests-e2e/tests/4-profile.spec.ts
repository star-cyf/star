import { type Page, test, expect } from "@playwright/test";
import { QuestionObjType, dummyData, editedDummyData } from "./utils/dummyData";
import { QuestionsPage } from "./pages/questions";
import { ProfilePage } from "./pages/profile";

// test.use({
//   launchOptions: {
//     slowMo: 400,
//   },
// });
/**========================================================================
 * Same Page Model: Generate a window and run all tests.
 *========================================================================**/
test.describe.serial("Create, Edit, Delete: Question", () => {
  let page: Page;
  let questionsPage: QuestionsPage;
  let profilePage: ProfilePage;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("http://localhost:3000");

    questionsPage = new QuestionsPage(page);
    profilePage = new ProfilePage(page);
  });

  let questionId: string | undefined;

  // -------- Create ----------
  // [1] Create a new Question

  test("Can create a new Question", async () => {
    await page.locator('a[href="/questions"]').click();
    questionId = await profilePage.createAQuestion(dummyData.question);
    await page.locator('a[href="/profile"]').click();
    await expect(page.getByTestId("questionQuantity")).toHaveCount(1);
  });

  // -------- Edit ----------
  // [2] Edit the newly Created Question

  test("Can Edit the Created Question", async () => {
    await page.locator('a[href="/profile"]').click();
    await profilePage.editAQuestion(questionId!, editedDummyData.question);
  });

  // -------- Delete ----------
  // [3] Delete the newly Created and Edited Question

  test("Can Delete the Edited Question", async () => {
    await profilePage.deleteAQuestion(questionId!, editedDummyData.question);
  });
});

test.describe
  .serial("Create a Question every minute. (Total 3 Questions)", () => {
  let page: Page;
  let questionsPage: QuestionsPage;
  let profilePage: ProfilePage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("http://localhost:3000");
    questionsPage = new QuestionsPage(page);
    profilePage = new ProfilePage(page);
  });

  // -------- Create ----------
  // [1] Create 3 new Questions

  let questionNum = 3;
  let obj: QuestionObjType;
  let newObj: QuestionObjType;

  test("Can create 3 new Question", async () => {
    // Change the default 30 seconds to 70s.
    test.setTimeout(140000);

    await page.locator('a[href="/questions"]').click();
    obj = questionsPage.createQuestionObj();
    newObj = questionsPage.createQuestionObj();

    for (let i = 0; i < questionNum; i++) {
      const text = `${dummyData.question} (${i + 1} times loop)`;
      const id = await profilePage.createAQuestion(text, i);

      if (i < questionNum - 1) {
        await page.waitForTimeout(60500); // 60.5s
        // change to loop 1 > 60.5s > loop 2 > 60.5s > loop 3
        // from loop 1 > 60.5s > loop 2 > 60.5s > loop 3 > 60.5s
      }

      const { created, updated } = await questionsPage.getQuestionTimestamps(
        page,
        id
      );

      questionsPage.updateQuestionObj(obj, id, text, created);
      questionsPage.updateQuestionObj(newObj, id, text, created);
    }
    console.log(obj);

    await page.locator('a[href="/profile"]').click();

    expect(await page.getByTestId("questionQuantity").innerText()).toBe(
      obj.id.length.toString()
    );

    await page.getByLabel("Sort").click();
    await page.getByRole("option", { name: "Recently Created" }).click();

    for (const key in newObj) {
      newObj[key as keyof typeof newObj] =
        newObj[key as keyof typeof newObj].reverse();
    }
    console.log(newObj);

    questionsPage.reverseQuestionObj(newObj);
  });

  // -------- Edit ----------
  // [2] Edit the newly Created Question

  test("Can Edit the Created Question", async () => {
    await page.locator('a[href="/profile"]').click();

    // await profilePage.editAQuestion(questionId!, editedDummyData.question);
  });

  // // -------- Delete ----------
  // // [3] Delete the newly Created and Edited Question

  // test("Can Delete the Edited Question", async () => {
  //   await profilePage.deleteAQuestion(questionId!, editedDummyData.question);
  // });
});
