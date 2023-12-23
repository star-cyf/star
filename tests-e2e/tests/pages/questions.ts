//it is equal client/src/pages/QuestionsPage.tsx
//in other word, only can see the page of Questions
//localhost:3000/questions/
import { expect, type Locator, type Page } from "@playwright/test";

export class QuestionsPage {
  readonly page: Page;

  readonly addAQuestionButton: Locator;
  readonly questionTextarea: Locator;
  readonly addQuestionButton: Locator;

  readonly editQuestionButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addAQuestionButton = page.getByText("Add a question");
    this.questionTextarea = page.locator("#question");
    this.addQuestionButton = page.getByText("Add question");
    this.editQuestionButton = page.getByText("Edit Question");
  }

  public async scrollDown(page: Page, locator: Locator) {
    while (!(await locator.isVisible())) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      // await page.mouse.wheel(0, 10000);
    }
  }

  async createAQuestion(questionText: string) {
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
}
