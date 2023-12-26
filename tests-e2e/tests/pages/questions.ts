//it is equal client/src/pages/QuestionsPage.tsx
//in other word, only can see the page of Questions
//localhost:3000/questions/
import { expect, type Locator, type Page } from "@playwright/test";

export class QuestionsPage {
  readonly page: Page;

  readonly addAQuestionButton: Locator;
  readonly questionTextarea: Locator;
  readonly addQuestionButton: Locator;
  readonly questionSuccessfulMessage: Locator;

  readonly editQuestionButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addAQuestionButton = page.getByText("Add a question");
    this.questionTextarea = page.locator("#question");
    this.addQuestionButton = page.getByText("Add question");
    this.questionSuccessfulMessage = page.getByText(
      "✅ Your Question was successfully added! Thank you"
    );
    this.editQuestionButton = page.getByText("Edit Question");
  }

  public async scrollDown(page: Page, locator: Locator) {
    while (!(await locator.isVisible())) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      // await page.mouse.wheel(0, 10000);
    }
  }

  async createAQuestion(questionText: string, i = 0) {
    // click the button Add a Question
    await this.addAQuestionButton.click();

    // fill the dummyData.question in the textarea of #question
    await this.questionTextarea.fill(questionText);

    // click the button Add Question
    await this.addQuestionButton.click();

    // check if the successful message is hidden in 8s
    await this.questionSuccessfulMessage.waitFor({
      state: "hidden",
      timeout: 8000,
    });
    const questionLink = this.page.getByText(questionText);
    await questionLink.waitFor({
      state: "visible",
      timeout: 8000,
    });

    // if cant find the questionLink, will scrollDown
    await this.scrollDown(this.page, questionLink);

    // if comment out this code line, questionUrl will return null
    await this.page.waitForTimeout(3000);

    const questionUrl = await this.page
      .getByText(questionText)
      .getAttribute("href"); // '/questions/151'
    console.log(`questionText: ${questionText}`);
    console.log(`questionUrl: ${questionUrl}`);

    const questionId = `questionId-${questionUrl?.split("/").at(-1)}`; // questionId-151
    const questionDiv = this.page.getByTestId(questionId);

    // if cant find the questionDiv, will scrollDown
    if (this.page.url().split("/").at(-1) === "questions") {
      await this.scrollDown(this.page, questionDiv);
    }

    // check if the questionDiv is visible in 8s
    await questionDiv.waitFor({ state: "visible", timeout: 8000 });

    // after creating question, expect to see the question link in the page
    await expect(questionDiv).toBeVisible();

    // expect the questionDiv 'includes' dummyData.question
    await expect(questionDiv).toContainText(`${questionText}`);

    return questionId;

    // console.log(await questionLink.innerText()); // with <p>
    // console.log(await questionLink.textContent()); // without <p> === .toHaveText()
    // await expect(questionLink).toHaveText(`${this.questionLink}`);

    // DON'T REMOVE
    // const questionsLinks = await page.locator('a[href^="/questions/"]');
    // expect(await questionsLinks.allTextContents()).toEqual(questions.reverse());
  }

  async editAQuestion(questionId: string, editedQuestionText: string) {
    const questionDiv = this.page.locator(`[data-testid=${questionId}]`);

    // if cant find the questionDiv, will scrollDown
    await this.scrollDown(this.page, questionDiv);

    await questionDiv.locator('svg[data-testid="EditOutlinedIcon"]').click();

    await this.questionTextarea.fill(`${editedQuestionText}`);
    await this.editQuestionButton.click();

    // check if the editDummy.question is visible in 8s
    await this.page
      .getByText(editedQuestionText)
      .waitFor({ state: "visible", timeout: 8000 });
    // check if the successful message is hidden in 8s
    await this.questionSuccessfulMessage.waitFor({
      state: "hidden",
      timeout: 8000,
    });

    await expect(this.page.getByText(editedQuestionText)).toBeVisible();

    // check if the editedDummyData.question in the questionIdDiv
    await expect(questionDiv).toContainText(`${editedQuestionText}`);

    // DON'T REMOVE
    // const questionsLinks = await page.locator('a[href^="/questions/"]');
    // expect(await questionsLinks.allTextContents()).toEqual(
    //   editedQuestions.reverse()
    // );
  }

  async deleteAQuestion(questionId: string, editedQuestionText: string) {
    const questionDiv = this.page.locator(`[data-testid=${questionId}]`);

    // if cant find the questionDiv, will scrollDown
    await this.scrollDown(this.page, questionDiv);

    await questionDiv.locator('svg[data-testid="DeleteOutlineIcon"]').click();

    await this.page
      .getByText(editedQuestionText)
      .waitFor({ state: "hidden", timeout: 8000 });

    await expect(this.page.getByText(editedQuestionText)).not.toBeVisible();
    await expect(questionDiv).not.toBeVisible();

    // const questionsLinks = await page.locator('a[href^="/questions/"]');
    // expect(await questionsLinks.allTextContents()).toEqual(
    //   editedQuestions.reverse()
    // );
  }

  // sort
  async createQuestionEveryMinute(questionText: string) {
    // click the button Add a Question
    await this.addAQuestionButton.click();

    // fill the dummyData.question in the textarea of #question
    await this.questionTextarea.fill(questionText);

    // click the button Add Question
    await this.addQuestionButton.click();

    const questionLink = this.page.getByText(questionText);

    // if cant find the questionLink, will scrollDown
    await this.scrollDown(this.page, questionLink);

    // check if the questionLink is visible in 8s
    await questionLink.waitFor({ state: "visible", timeout: 8000 });

    // check if the successful message is hidden in 8s
    await this.questionSuccessfulMessage.waitFor({
      state: "hidden",
      timeout: 8000,
    });

    // console.log(await questionLink.innerText()); // with <p>
    // console.log(await questionLink.textContent()); // without <p> === .toHaveText()
    // await expect(questionLink).toHaveText(`${this.questionLink}`);

    // after creating question, expect to see the question link in the page
    await expect(questionLink).toBeVisible();

    const questionUrl = await questionLink.getAttribute("href"); // '/questions/151'
    const questionId = `questionId-${questionUrl?.split("/").at(-1)}`; // questionId-151
    const questionDiv = this.page.getByTestId(questionId);

    // expect the questionDiv 'includes' dummyData.question
    await expect(questionDiv).toContainText(`${questionText}`);
    return questionId;
    // DON'T REMOVE
    // const questionsLinks = await page.locator('a[href^="/questions/"]');
    // expect(await questionsLinks.allTextContents()).toEqual(questions.reverse());
  }
}
