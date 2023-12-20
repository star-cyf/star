import { test, expect } from "@playwright/test";
import { dummy, editedDummy } from "./utils/dummy";
// 1. Create 1 question, then craete 1 answer, then crate 1 comment
// 2. Edit 1 comment, then edit 1 answer, then edit 1 question
// 3. Delete 1 comment, then delete 1 answer, then delete 1 question

test.use({
  // viewport: { width: 1280, height: 1020 },
  // headless: true,
  // launchOptions: {
  //   slowMo: 1000,
  // },
});
test.describe
  .serial("Create, Edit, Delete 1 Question, 1 Answer, 1 Comment", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.locator('a[href="/questions"]').click();
  });
  let questionId: string;
  let answerId: string | null;
  let commentId: string | null;

  //--------Create----------

  test("Could see a question if allowed to create", async ({ page }) => {
    // click the button of ADD A QUESTION
    await page.locator("text=Add a question").click();

    // fill the dummy.question in the textarea of #question
    await page.locator("#question").fill(dummy.question);

    // click the button of ADD QUESTION
    await page.locator("text=Add question").click();

    // store the question div element with dummy.question to questionElement
    let questionElement = page.locator(
      `a[href^="/questions/"] >> text=${dummy.question}`
    );
    // check if the dummy.question is visible in 10s
    await questionElement.waitFor({ state: "visible", timeout: 10000 });
    await expect(questionElement).toBeVisible();

    // grap the questionId from the href
    const getQuestionUrl = await questionElement.getAttribute("href"); // '/questions/151'
    questionId = `questionId-${getQuestionUrl?.split("/").at(-1)}`; // questionId-151
    questionElement = page.locator(`[data-testid="${questionId}"]`);

    // console.log(await questionElement.innerText()); // with <p>
    // console.log(await questionElement.textContent()); // without <p> === .toHaveText()

    // valid the questionElement 'includes' dummy.question
    await expect(questionElement).toContainText(`${dummy.question}`);

    // await expect(questionElement).toHaveText(`${dummy.question}`);

    // DONT REMOVE
    // const questionsLinks = await page.locator('a[href^="/questions/"]');
    // expect(await questionsLinks.allTextContents()).toEqual(questions.reverse());
  });

  test("Could see a answer if allowed to create", async ({ page }) => {
    const questionElement = page.locator(`[data-testid=${questionId}]`);
    await questionElement.locator(`a[href^="/questions/"]`).click();
    await page.locator("text=Add an Answer").click();

    for (const key in dummy.answer) {
      await page.locator(`#${key}`).fill(`${dummy.answer[key]}`);
    }
    await page.locator("text=Add Answer").click();

    // check if the dummy.answer is visible in 10s
    for (const key in dummy.answer) {
      await page
        .locator(`text=${dummy.answer[key]}`)
        .waitFor({ state: "visible", timeout: 10000 });
      await expect(page.locator(`text=${dummy.answer[key]}`)).toBeVisible();
    }

    let answerIdElement = page.locator('[data-testid^="answerId-"]');
    answerId = await answerIdElement.getAttribute("data-testid");
    answerIdElement = page.locator(`[data-testid="${answerId}"]`);

    // valid if there are star answers in the answerId element
    for (const key in dummy.answer) {
      await expect(answerIdElement).toContainText(`${dummy.answer[key]}`);
    }
  });

  test("Could see a comment if allowed to create", async ({ page }) => {
    const questionElement = page.locator(`[data-testid=${questionId}]`);
    await questionElement.locator(`a[href^="/questions/"]`).click();

    await page.locator("text=Add a Comment").click();
    await page.locator("#comment").fill(dummy.comment);
    await page.locator("text=Add Comment").click();

    // check if the dummy.comment is visible in 10s
    await page
      .locator(`text=${dummy.comment}`)
      .waitFor({ state: "visible", timeout: 10000 });
    await expect(page.locator(`text=${dummy.comment}`)).toBeVisible();

    let commentIdElement = page.locator('[data-testid^="commentId-"]');
    commentId = await commentIdElement.getAttribute("data-testid");
    commentIdElement = page.locator(`[data-testid=${commentId}]`);

    // check if the dummy.comment in the commentIdElement
    await expect(commentIdElement).toContainText(`${dummy.comment}`);
  });

  //--------Edit----------
  test("Could see a edited comment if allowed to edit", async ({ page }) => {
    const questionElement = page.locator(`[data-testid=${questionId}]`);
    await questionElement.locator(`a[href^="/questions/"]`).click();

    const commentElement = page.locator(`[data-testid=${commentId}]`);
    await commentElement.locator('svg[data-testid="EditOutlinedIcon"]').click();

    await page.locator("#comment").fill(`${editedDummy.comment}`);
    await page.locator("text=Edit Comment").click();

    // check if the editDummy.comment is visible in 10s
    await page
      .locator(`text=${editedDummy.comment}`)
      .waitFor({ state: "visible", timeout: 10000 });
    await expect(page.locator(`text=${editedDummy.comment}`)).toBeVisible();

    // check if the editedDummy.comment in the commentIdElement
    await expect(commentElement).toContainText(`${editedDummy.comment}`);
  });

  test("Could see a edited answer if allowed to edit", async ({ page }) => {
    const questionElement = page.locator(`[data-testid=${questionId}]`);
    await questionElement.locator(`a[href^="/questions/"]`).click();

    const answerElement = page.locator(`[data-testid=${answerId}]`);
    await answerElement
      .locator(`button[data-testid="EditOutlinedIcon-${answerId}"]`)
      .click();

    for (const key in editedDummy.answer) {
      await page.locator(`#${key}`).fill(`${editedDummy.answer[key]}`);
    }
    await page.locator("text=Edit Answer").click();

    // check if the editDummy.answer is visible in 10s
    for (const key in editedDummy.answer) {
      await page
        .locator(`text=${editedDummy.answer[key]}`)
        .waitFor({ state: "visible", timeout: 10000 });
      await expect(
        page.locator(`text=${editedDummy.answer[key]}`)
      ).toBeVisible();
    }

    // valid if there are editedDummy.answers in the answerId element
    for (const key in editedDummy.answer) {
      await expect(answerElement).toContainText(`${editedDummy.answer[key]}`);
    }
  });

  test("Could see a edited question if allowed to edit", async ({ page }) => {
    const questionElement = page.locator(`[data-testid=${questionId}]`);
    await questionElement
      .locator('svg[data-testid="EditOutlinedIcon"]')
      .click();

    await page.locator("#question").fill(`${editedDummy.question}`);
    await page.locator("text=Edit Question").click();

    // check if the editDummy.question is visible in 10s
    await questionElement.waitFor({ state: "visible", timeout: 10000 });
    await expect(questionElement).toBeVisible();

    // valid the questionElement 'includes' editedDummy.question
    await expect(questionElement).toContainText(`${editedDummy.question}`);

    // DONT REMOVE
    // const questionsLinks = await page.locator('a[href^="/questions/"]');
    // expect(await questionsLinks.allTextContents()).toEqual(
    //   editedQuestions.reverse()
    // );
  });

  //--------Delete----------
  test("Couldn't see the edited comment if allowed to delete", async ({
    page,
  }) => {
    const questionElement = page.locator(`[data-testid=${questionId}]`);
    await questionElement.locator(`a[href^="/questions/"]`).click();

    const commentElement = page.locator(`[data-testid=${commentId}]`);
    await commentElement
      .locator('svg[data-testid="DeleteOutlineIcon"]')
      .click();

    await page
      .locator(`text=${editedDummy.comment}`)
      .waitFor({ state: "hidden", timeout: 10000 });
    await expect(page.locator(`text=${editedDummy.comment}`)).not.toBeVisible();
  });

  test("Couldn't see the edited answer if allowed to delete", async ({
    page,
  }) => {
    const questionElement = page.locator(`[data-testid=${questionId}]`);
    await questionElement.locator(`a[href^="/questions/"]`).click();

    const answerElement = page.locator(`[data-testid=${answerId}]`);
    await answerElement
      .locator(`button[data-testid="DeleteOutlineIcon-${answerId}"]`)
      .click();

    for (const key in editedDummy.answer) {
      await page
        .locator(`text=${editedDummy.answer[key]}`)
        .waitFor({ state: "hidden", timeout: 10000 });
      await expect(
        page.locator(`text=${editedDummy.answer[key]}`)
      ).not.toBeVisible();
    }
  });

  test("Couldn't see the edited question if allowed to delete", async ({
    page,
  }) => {
    const questionElement = page.locator(`[data-testid=${questionId}]`);
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
