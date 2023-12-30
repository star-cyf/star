// For Tests on: client/src/pages/QuestionsPage.tsx
import { expect, type Locator, type Page } from "@playwright/test";
import { QuestionObjType } from "../utils/dummy-data";

export class QuestionsPage {
  readonly page: Page;

  // crud
  readonly addAQuestionButton: Locator;
  readonly questionTextarea: Locator;
  readonly addQuestionButton: Locator;
  readonly questionSuccessfulMessage: Locator;

  readonly editQuestionButton: Locator;

  // sort
  readonly sortSelect: Locator;
  readonly createdOption: Locator;
  readonly updatedOption: Locator;

  // search
  readonly searchField: Locator;

  constructor(page: Page) {
    this.page = page;

    // crud
    this.addAQuestionButton = page.getByText("Add a question");
    this.questionTextarea = page.locator("#question");
    this.addQuestionButton = page.getByText("Add question");
    this.questionSuccessfulMessage = page.getByText(
      "✅ Your Question was successfully added! Thank you"
    );
    this.editQuestionButton = page.getByText("Edit Question");

    // sort
    this.sortSelect = page.getByLabel("Sort");
    this.createdOption = page.getByRole("option", { name: "Recently Created" });
    this.updatedOption = page.getByRole("option", { name: "Recently Updated" });

    // search
    this.searchField = page.getByPlaceholder("Search Questions...");
  }

  async scrollDown(page: Page, locator: Locator) {
    // had to add 'page.evaluate' instead of 'this.page.evaluate' otherwise it returns undefined
    while (!(await locator.isVisible())) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }
  }

  async createAQuestion(questionText: string) {
    // click the button Add a Question
    await this.addAQuestionButton.click();
    // fill the dummyData.question in the textarea of #question
    await this.questionTextarea.fill(questionText);
    // click the button Add Question
    await this.addQuestionButton.click();
    await this.questionTextarea.waitFor({
      state: "hidden",
      timeout: 8000,
    });
    // check if the successful message is hidden in 8s
    await this.questionSuccessfulMessage.waitFor({
      state: "hidden",
      timeout: 8000,
    });
    const questionLink = this.page.getByText(questionText);
    // if we can't find the text of questionLink, we will scrollDown
    await this.scrollDown(this.page, questionLink);
    await questionLink.waitFor({
      state: "visible",
      timeout: 8000,
    });
    // this is needed, otherwise questionURL returns null
    await this.page.waitForTimeout(300);
    const questionUrl = await this.page
      .getByText(questionText)
      .getAttribute("href");
    // '/questions/151'
    const questionId = `questionId-${questionUrl?.split("/").at(-1)}`; // questionId-151
    const questionDiv = this.page.getByTestId(questionId);
    // after creating a question, we expect to see the question link in the page
    await expect(questionDiv).toBeVisible();
    // expect the questionDiv 'includes' the dummyData.question
    await expect(questionDiv).toContainText(`${questionText}`);
    return questionId;
  }

  async createMultiQuestion(questionText: string, questionNum: number) {
    const obj = this.createQuestionObj();
    const reversedObj = this.createQuestionObj();
    for (let i = 0; i < questionNum; i++) {
      const text = `${questionText} (${i + 1} times loop)`;
      const id = await this.createAQuestion(text);
      this.pushQuestionObj(obj, id, text);
      this.pushQuestionObj(reversedObj, id, text);
    }
    this.reverseQuestionObj(reversedObj);
    // await this.checkIfOrderByCreatedTime(reversedObj);
    return { obj, reversedObj };
  }

  async editAQuestion(questionId: string, editedQuestionText: string) {
    const questionDiv = this.page.locator(`[data-testid=${questionId}]`);
    // if we cant find the questionDiv, we scrollDown
    await this.scrollDown(this.page, questionDiv);
    await questionDiv.locator('svg[data-testid="EditOutlinedIcon"]').click();
    await this.questionTextarea.fill(editedQuestionText);
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
    await expect(questionDiv).toContainText(editedQuestionText);
  }

  async editMultiQuestion(originalObj: QuestionObjType) {
    // Only intentionally swap the first element with the second element,
    // the second element with the third element,
    // and the third element with the first element in multiple questions.
    const editedObj = {
      id: originalObj.id.map(
        (_, index, array) => array[(index + 1) % array.length]
      ),
      text: originalObj.text.map(
        (_, index, array) =>
          `${array[(index + 1) % array.length]} , edited (${
            index + 1
          } times loop)`
      ),
    };
    for (const id of editedObj.id) {
      const index: number = editedObj.id.indexOf(id);
      const editedId: string = editedObj.id[index];
      const editedText: string = editedObj.text[index];
      await this.editAQuestion(editedId, editedText);
    }
    await this.checkIfOrderByUpdatedTime(editedObj);
    return editedObj;
  }

  async deleteAQuestion(questionId: string, editedQuestionText: string) {
    const questionDiv = this.page.locator(`[data-testid=${questionId}]`);
    // if we cant find the questionDiv, we scrollDown
    await this.scrollDown(this.page, questionDiv);
    await questionDiv.locator('svg[data-testid="DeleteOutlineIcon"]').click();
    await this.page
      .getByText(editedQuestionText)
      .waitFor({ state: "hidden", timeout: 8000 });
    await expect(this.page.getByText(editedQuestionText)).not.toBeVisible();
    await expect(questionDiv).not.toBeVisible();
  }

  async deleteMultiQuestion(questionObj: QuestionObjType) {
    for (const id of questionObj.id) {
      const index: number = questionObj.id.indexOf(id);
      const editedId: string = questionObj.id[index];
      const editedText: string = questionObj.text[index];
      await this.deleteAQuestion(editedId, editedText);
    }
  }

  createQuestionObj() {
    return {
      id: [],
      text: [],
    };
  }

  pushQuestionObj(
    questionObj: QuestionObjType,
    questionId: string,
    questionText: string
  ) {
    questionObj.id.push(questionId);
    questionObj.text.push(questionText);
  }

  // async getQuestionTimestamps(page: Page, questionId: string) {
  //   const createdTime = await page
  //     .getByTestId(questionId)
  //     .getByText(/created today, at \d{2}:\d{2}[APMapm]+$/i)
  //     .innerText();
  //   return createdTime;
  // }

  reverseQuestionObj(questionObj: QuestionObjType) {
    for (const key in questionObj) {
      questionObj[key as keyof typeof questionObj] =
        questionObj[key as keyof typeof questionObj].reverse();
    }
  }

  async generateGrabObj() {
    const grabObj: QuestionObjType = this.createQuestionObj();
    // Note: If there are others questions, this test will fail
    const allQuestionDivs = await this.page.getByTestId(/questionId-\d/).all();
    for (let i = 0; i < allQuestionDivs.length; i++) {
      const questionDiv = this.page.getByTestId(/questionId-\d/).nth(i);
      const id = await questionDiv.getAttribute("data-testid");
      const text = await questionDiv.locator("a").textContent();
      this.pushQuestionObj(grabObj, id!, text!);
    }
    return grabObj;
  }

  async checkIfOrderByCreatedTime(updatedObj: QuestionObjType) {
    await this.sortSelect.click();
    await this.createdOption.click();
    for (const id of updatedObj.id) {
      const questionIdDiv = this.page.getByTestId(id);
      await this.scrollDown(this.page, questionIdDiv);
    }
    const grabObj = await this.generateGrabObj();
    expect(grabObj).toEqual(updatedObj);
  }

  // sort
  async checkIfOrderByUpdatedTime(updatedObj: QuestionObjType) {
    await this.sortSelect.click();
    await this.updatedOption.click();
    for (const id of updatedObj.id) {
      const questionIdDiv = this.page.getByTestId(id);
      await this.scrollDown(this.page, questionIdDiv);
    }
    const grabObj = await this.generateGrabObj();
    // because updated = new to old so have to reverse the updatedObj
    this.reverseQuestionObj(updatedObj);
    expect(grabObj).toEqual(updatedObj);
  }

  async createMultiQuestionWithSearch(questionNum: number) {
    const obj = this.createQuestionObj();
    for (let i = 0; i < questionNum; i++) {
      const random = "#" + Math.random().toString(16).slice(2, 8);
      const text = `${random} This is a test Question (${i + 1} times loop)`;
      const id = await this.createAQuestion(text);
      this.pushQuestionObj(obj, id, text);
    }
    return obj;
  }

  async checkWithSearch(questionObj: QuestionObjType) {
    for (let i = 0; i < 5; i++) {
      const searchText = (i + 1).toString();
      await this.searchField.fill(searchText);
      // wait for the 'loading...' of the search results
      await this.page.waitForTimeout(2000);
      const grabObj = await this.generateGrabObj();
      const filteredArr = questionObj.text.filter((text) =>
        text.includes(searchText)
      );
      expect(filteredArr).toEqual(grabObj.text);
    }
    await this.searchField.fill("");
    await this.page.waitForTimeout(2000);
  }
}
