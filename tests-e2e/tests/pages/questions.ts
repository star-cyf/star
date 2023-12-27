//it is equal client/src/pages/QuestionsPage.tsx
//in other word, only can see the page of Questions
//localhost:3000/questions/
import { expect, type Locator, type Page } from "@playwright/test";
import { QuestionObjType } from "../utils/dummyData";

export class QuestionsPage {
  readonly page: Page;

  //crud
  readonly addAQuestionButton: Locator;
  readonly questionTextarea: Locator;
  readonly addQuestionButton: Locator;
  readonly questionSuccessfulMessage: Locator;

  readonly editQuestionButton: Locator;

  //sort
  readonly sortDownArrowButton: Locator;
  readonly createdOption: Locator;
  readonly updatedOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addAQuestionButton = page.getByText("Add a question");
    this.questionTextarea = page.locator("#question");
    this.addQuestionButton = page.getByText("Add question");
    this.questionSuccessfulMessage = page.getByText(
      "✅ Your Question was successfully added! Thank you"
    );
    this.editQuestionButton = page.getByText("Edit Question");

    // this.sortDownArrowButton = page.getByTestId("ArrowDropDownIcon");
    this.sortDownArrowButton = page.getByLabel("Sort");
    this.createdOption = page.getByRole("option", { name: "Recently Created" });
    this.updatedOption = page.getByRole("option", { name: "Recently Updated" });
  }

  async scrollDown(page: Page, locator: Locator) {
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
    await this.page.waitForTimeout(300);

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
  }

  async editAQuestion(questionId: string, editedQuestionText: string) {
    const questionDiv = this.page.locator(`[data-testid=${questionId}]`);

    // if cant find the questionDiv, will scrollDown
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
  }

  // sort
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
    this.checkIfOrderByCreatedTime(reversedObj);
    return obj;
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
  async checkIfOrderByCreatedTime(updatedObj: QuestionObjType) {
    await this.sortDownArrowButton.click();
    await this.createdOption.click();

    for (const id of updatedObj.id) {
      const questionIdDiv = this.page.getByTestId(id);
      await this.scrollDown(this.page, questionIdDiv);
    }

    const grabObj: QuestionObjType = this.createQuestionObj();

    // Note: If there are others questions, this testing will be failed
    const allQuestionDivs = await this.page.getByTestId(/questionId-\d/).all();

    for (let i = 0; i < allQuestionDivs.length; i++) {
      const questionDiv = this.page.getByTestId(/questionId-\d/).nth(i);
      const id = await questionDiv.getAttribute("data-testid");
      const text = await questionDiv.locator("a").textContent();

      this.pushQuestionObj(grabObj, id!, text!);
    }
    expect(grabObj).toEqual(updatedObj);
  }
  async editMultiQuestion(originalObj: QuestionObjType) {
    const editedObj = {
      id: originalObj.id.map(
        (_, index, array) => array[(index + 1) % array.length]
      ),
      text: originalObj.text.map(
        (_, index, array) =>
          `${array[(index + 1) % array.length]} | edited (${
            index + 1
          } times loop)`
      ),
    };

    for (const id of editedObj.id) {
      const questionDiv = this.page.locator(`[data-testid=${id}]`);

      // if cant find the questionDiv, will scrollDown
      await this.scrollDown(this.page, questionDiv);
      await questionDiv.locator('svg[data-testid="EditOutlinedIcon"]').click();

      const index = editedObj.id.indexOf(id);
      const editedText = editedObj.text[index];
      await this.questionTextarea.fill(editedText);

      await this.editQuestionButton.click();

      // check if the editDummy.question is visible in 8s
      await this.page
        .getByText(editedText)
        .waitFor({ state: "visible", timeout: 8000 });

      // check if the successful message is hidden in 8s
      await this.questionSuccessfulMessage.waitFor({
        state: "hidden",
        timeout: 8000,
      });

      await expect(this.page.getByText(editedText)).toBeVisible();

      // check if the editedDummyData.question in the questionIdDiv
      await expect(questionDiv).toContainText(editedText);
    }

    await this.checkIfOrderByUpdatedTime(editedObj);
    return editedObj;
  }
  async checkIfOrderByUpdatedTime(updatedObj: QuestionObjType) {
    await this.sortDownArrowButton.click();
    await this.updatedOption.click();

    for (const id of updatedObj.id) {
      const questionIdDiv = this.page.getByTestId(id);
      await this.scrollDown(this.page, questionIdDiv);
    }

    const grabObj: QuestionObjType = this.createQuestionObj();

    // Note: If there are others questions, this testing will be failed
    const allQuestionDivs = await this.page.getByTestId(/questionId-\d/).all();

    for (let i = 0; i < allQuestionDivs.length; i++) {
      const questionDiv = this.page.getByTestId(/questionId-\d/).nth(i);
      const id = await questionDiv.getAttribute("data-testid");
      const text = await questionDiv.locator("a").textContent();

      this.pushQuestionObj(grabObj, id!, text!);
    }

    // console.log(grabObj);
    // console.log(updatedObj);

    // because updated = new to old so have to use reverse the updatedObj
    this.reverseQuestionObj(updatedObj);
    expect(grabObj).toEqual(updatedObj);
  }

  async deleteMultiQuestion(questionObj: QuestionObjType) {
    for (const id of questionObj.id) {
      const questionDiv = this.page.locator(`[data-testid=${id}]`);

      // if cant find the questionDiv, will scrollDown
      await this.scrollDown(this.page, questionDiv);

      await questionDiv.locator('svg[data-testid="DeleteOutlineIcon"]').click();
      const editedText = questionObj.text[questionObj.id.indexOf(id)];

      await this.page
        .getByText(editedText)
        .waitFor({ state: "hidden", timeout: 8000 });

      await expect(this.page.getByText(editedText)).not.toBeVisible();
      await expect(questionDiv).not.toBeVisible();
    }
  }
}
