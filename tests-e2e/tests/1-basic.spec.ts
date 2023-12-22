import { test, expect } from "@playwright/test";
import { dummyData, editedDummyData } from "./utils/dummyData";
import { scrollDown } from "./utils/action";

// test.use({
//   viewport: { width: 1280, height: 1020 },
//   headless: false,
//   launchOptions: {
//     slowMo: 500,
//   },
// });

test.describe.serial("Create, Edit, Delete: Question, Answer, Comment", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.locator('a[href="/questions"]').click();
  });

  let questionId: string;
  let answerId: string | null;
  let commentId: string | null;

  // -------- Create ----------
  // [1a] Create a new Question
  // [1b] Create a new Answer on that Question
  // [1c] Create a new Comment on that Answer

  test("Can create a new Question", async ({ page }) => {
    // click the button Add a Question
    await page.locator("text=Add a question").click();

    // fill the dummyData.question in the textarea of #question
    await page.locator("#question").fill(dummyData.question);

    // click the button Add Question
    await page.locator("text=Add question").click();

    // store the question div element with dummyData.question to questionElement
    let questionElement = page.locator(
      `a[href^="/questions/"] >> text=${dummyData.question}`
    );

    // if cant find the question, will scrollDown
    await scrollDown(page, questionElement);

    // check if the dummyData.question is visible in 10s
    await questionElement.waitFor({ state: "visible", timeout: 10000 });
    await expect(questionElement).toBeVisible();

    // get the questionId from the href
    const getQuestionUrl = await questionElement.getAttribute("href"); // '/questions/151'
    questionId = `questionId-${getQuestionUrl?.split("/").at(-1)}`; // questionId-151
    questionElement = page.locator(`[data-testid="${questionId}"]`);

    // console.log(await questionElement.innerText()); // with <p>
    // console.log(await questionElement.textContent()); // without <p> === .toHaveText()

    // valid the questionElement 'includes' dummyData.question
    await expect(questionElement).toContainText(`${dummyData.question}`);

    // await expect(questionElement).toHaveText(`${dummyData.question}`);

    // DON'T REMOVE
    // const questionsLinks = await page.locator('a[href^="/questions/"]');
    // expect(await questionsLinks.allTextContents()).toEqual(questions.reverse());
  });

  test("Can create a new Answer", async ({ page }) => {
    const questionElement = page.locator(`[data-testid=${questionId}]`);

    await scrollDown(page, questionElement);

    await questionElement.locator(`a[href^="/questions/"]`).click();
    await page.locator("text=Add an Answer").click();

    for (const key in dummyData.answer) {
      await page.locator(`#${key}`).fill(`${dummyData.answer[key]}`);
    }
    await page.locator("text=Add Answer").click();

    // check if the dummyData.answer is visible in 10s
    for (const key in dummyData.answer) {
      await page
        .locator(`text=${dummyData.answer[key]}`)
        .waitFor({ state: "visible", timeout: 10000 });
      await expect(page.locator(`text=${dummyData.answer[key]}`)).toBeVisible();
    }

    let answerIdElement = page.locator('[data-testid^="answerId-"]');
    answerId = await answerIdElement.getAttribute("data-testid");
    answerIdElement = page.locator(`[data-testid="${answerId}"]`);

    // valid if there are star answers in the answerId element
    for (const key in dummyData.answer) {
      await expect(answerIdElement).toContainText(`${dummyData.answer[key]}`);
    }
  });

  test("Can create a new Comment", async ({ page }) => {
    const questionElement = page.locator(`[data-testid=${questionId}]`);
    await scrollDown(page, questionElement);
    await questionElement.locator(`a[href^="/questions/"]`).click();

    await page.locator("text=Add a Comment").click();
    await page.locator("#comment").fill(dummyData.comment);
    await page.locator("text=Add Comment").click();

    // check if the dummyData.comment is visible in 10s
    await page
      .locator(`text=${dummyData.comment}`)
      .waitFor({ state: "visible", timeout: 10000 });
    await expect(page.locator(`text=${dummyData.comment}`)).toBeVisible();

    let commentIdElement = page.locator('[data-testid^="commentId-"]');
    commentId = await commentIdElement.getAttribute("data-testid");
    commentIdElement = page.locator(`[data-testid=${commentId}]`);

    // check if the dummyData.comment in the commentIdElement
    await expect(commentIdElement).toContainText(`${dummyData.comment}`);
  });

  // -------- Edit ----------
  // [2a] Edit the newly Created Comment
  // [2b] Edit the newly Created Answer
  // [2c] Edit the newly Created Question

  test("Can Edit the Created Comment", async ({ page }) => {
    const questionElement = page.locator(`[data-testid=${questionId}]`);
    await scrollDown(page, questionElement);
    await questionElement.locator(`a[href^="/questions/"]`).click();

    const commentElement = page.locator(`[data-testid=${commentId}]`);
    await commentElement.locator('svg[data-testid="EditOutlinedIcon"]').click();

    await page.locator("#comment").fill(`${editedDummyData.comment}`);
    await page.locator("text=Edit Comment").click();

    // check if the editDummy.comment is visible in 10s
    await page
      .locator(`text=${editedDummyData.comment}`)
      .waitFor({ state: "visible", timeout: 10000 });
    await expect(page.locator(`text=${editedDummyData.comment}`)).toBeVisible();

    // check if the editedDummyData.comment in the commentIdElement
    await expect(commentElement).toContainText(`${editedDummyData.comment}`);
  });

  test("Can Edit the Created Answer", async ({ page }) => {
    const questionElement = page.locator(`[data-testid=${questionId}]`);
    await scrollDown(page, questionElement);
    await questionElement.locator(`a[href^="/questions/"]`).click();

    const answerElement = page.locator(`[data-testid=${answerId}]`);
    await answerElement
      .locator(`button[data-testid="EditOutlinedIcon-${answerId}"]`)
      .click();

    for (const key in editedDummyData.answer) {
      await page.locator(`#${key}`).fill(`${editedDummyData.answer[key]}`);
    }
    await page.locator("text=Edit Answer").click();

    // check if the editDummy.answer is visible in 10s
    for (const key in editedDummyData.answer) {
      await page
        .locator(`text=${editedDummyData.answer[key]}`)
        .waitFor({ state: "visible", timeout: 10000 });
      await expect(
        page.locator(`text=${editedDummyData.answer[key]}`)
      ).toBeVisible();
    }

    // valid if there are editedDummyData.answers in the answerId element
    for (const key in editedDummyData.answer) {
      await expect(answerElement).toContainText(
        `${editedDummyData.answer[key]}`
      );
    }
  });

  test("Can Edit the Created Question", async ({ page }) => {
    const questionElement = page.locator(`[data-testid=${questionId}]`);
    await scrollDown(page, questionElement);
    await questionElement
      .locator('svg[data-testid="EditOutlinedIcon"]')
      .click();

    await page.locator("#question").fill(`${editedDummyData.question}`);
    await page.locator("text=Edit Question").click();

    // check if the editDummy.question is visible in 10s
    await questionElement.waitFor({ state: "visible", timeout: 10000 });
    await expect(questionElement).toBeVisible();

    // valid the questionElement 'includes' editedDummyData.question
    await expect(questionElement).toContainText(`${editedDummyData.question}`);

    // DON'T REMOVE
    // const questionsLinks = await page.locator('a[href^="/questions/"]');
    // expect(await questionsLinks.allTextContents()).toEqual(
    //   editedQuestions.reverse()
    // );
  });

  // -------- Delete ----------
  // [3a] Delete the newly Created and Edited Comment
  // [3b] Delete the newly Created and Edited Answer
  // [3c] Delete the newly Created and Edited Question

  test("Can Delete the Edited Comment", async ({ page }) => {
    const questionElement = page.locator(`[data-testid=${questionId}]`);
    await scrollDown(page, questionElement);
    await questionElement.locator(`a[href^="/questions/"]`).click();

    const commentElement = page.locator(`[data-testid=${commentId}]`);
    await commentElement
      .locator('svg[data-testid="DeleteOutlineIcon"]')
      .click();

    await page
      .locator(`text=${editedDummyData.comment}`)
      .waitFor({ state: "hidden", timeout: 10000 });
    await expect(
      page.locator(`text=${editedDummyData.comment}`)
    ).not.toBeVisible();
  });

  test("Can Delete the Edited Answer", async ({ page }) => {
    const questionElement = page.locator(`[data-testid=${questionId}]`);
    await scrollDown(page, questionElement);
    await questionElement.locator(`a[href^="/questions/"]`).click();

    const answerElement = page.locator(`[data-testid=${answerId}]`);
    await answerElement
      .locator(`button[data-testid="DeleteOutlineIcon-${answerId}"]`)
      .click();

    for (const key in editedDummyData.answer) {
      await page
        .locator(`text=${editedDummyData.answer[key]}`)
        .waitFor({ state: "hidden", timeout: 10000 });
      await expect(
        page.locator(`text=${editedDummyData.answer[key]}`)
      ).not.toBeVisible();
    }
  });

  test("Can Delete the Edited Question", async ({ page }) => {
    const questionElement = page.locator(`[data-testid=${questionId}]`);
    await scrollDown(page, questionElement);
    await questionElement
      .locator('svg[data-testid="DeleteOutlineIcon"]')
      .click();

    await questionElement.waitFor({ state: "hidden", timeout: 10000 });
    await expect(questionElement).not.toBeVisible();
    // const questionsLinks = await page.locator('a[href^="/questions/"]');
    // expect(await questionsLinks.allTextContents()).toEqual(
    //   editedQuestions.reverse()
    // );
  });
});
