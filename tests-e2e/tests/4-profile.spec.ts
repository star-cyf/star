import { type Page, test, expect } from "@playwright/test";
import { dummyData, editedDummyData } from "./utils/dummyData";
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
test.describe.skip("Create, Edit, Delete: Question", () => {
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

test.describe.serial
  .only("Create a Question every minute. (Total 3 Questions)", () => {
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
  // [1] Create a new Question

  let questionIdList: string[] = [];
  let questionNum = 3;

  test.skip("Can create 3 new Question", async () => {
    test.setTimeout(180000);
    await page.locator('a[href="/questions"]').click();
    for (let i = 0; i < questionNum; i++) {
      const questionId = await profilePage.createAQuestion(
        `${dummyData.question} | It is ${i + 1} times loop`,
        i
      );

      if (i < questionNum - 1) {
        // loop 1 > 60.5s > loop 2 > 60.5s > loop 3

        await page.waitForTimeout(60500); // 60.5s
      }

      questionIdList.push(questionId!);
    }

    await page.locator('a[href="/profile"]').click();
    expect(await page.getByTestId("questionQuantity").innerText()).toBe(
      questionIdList.length.toString()
    );
    let timeList: string[] = [];
    for (const questionId of questionIdList) {
      const time = await page
        .getByTestId(questionId)
        .getByText("created today, at*")
        .textContent();
      timeList.push(time!);
    }
    console.log(timeList);
  });

  // -------- Edit ----------
  // [2] Edit the newly Created Question

  test("Can Edit the Created Question", async () => {
    await page.locator('a[href="/profile"]').click();
    let timeList: string[] = [];
    let timeList2: string[] = [];
    questionIdList = ["questionId-269", "questionId-270", "questionId-271"];

    for (const questionId of questionIdList) {
      const ti = await page
        .getByTestId(questionId)
        .getByText(/created today, at \d{2}:\d{2}[APMapm]+$/i)
        .innerText();
      timeList.push(ti);
    }
    let mergedArray;
    mergedArray = questionIdList.map((questionId, i) => ({
      questionId,
      createdTime: timeList[i],
      updatedTime: timeList[i],
    }));
    console.log(mergedArray);
    await page.getByLabel("Sort").click();
    await page.getByRole("option", { name: "Recently Created" }).click();
    await page.pause();
    const newArr = questionIdList.reverse();
    for (const questionId of newArr) {
      const ti = await page
        .getByTestId(questionId)
        .getByText(/created today, at \d{2}:\d{2}[APMapm]+$/i)
        .innerText();
      timeList2.push(ti);
    }
    mergedArray = newArr.map((questionId, i) => ({
      questionId,
      createdTime: timeList[i],
      updatedTime: timeList[i],
    }));
    console.log(mergedArray);
    // await profilePage.editAQuestion(questionId!, editedDummyData.question);
  });

  // // -------- Delete ----------
  // // [3] Delete the newly Created and Edited Question

  // test("Can Delete the Edited Question", async () => {
  //   await profilePage.deleteAQuestion(questionId!, editedDummyData.question);
  // });
});
