import { Locator, type Page, expect } from "@playwright/test";
import { QuestionsPage } from "./questions";
import { QuestionObjType } from "../utils/dummyData";

export class ProfilePage {
  readonly page: Page;
  questionId: string | undefined;
  questionsButton: Locator;
  profileButton: Locator;
  profileQuestionCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.questionId;
    this.questionsButton = page.locator('a[href="/questions"]');
    this.profileButton = page.locator('a[href="/profile"]');
    this.profileQuestionCount = this.page.getByTestId("questionQuantity");
  }

  async createAQuestion(questionText: string) {
    await this.questionsButton.click();

    const action = new QuestionsPage(this.page);
    this.questionId = await action.createAQuestion(questionText);

    await this.profileButton.click();
    expect(await this.profileQuestionCount.textContent()).toBe("1");
    return this.questionId;
  }

  async editAQuestion(questionId: string, editedQuestionText: string) {
    await this.profileButton.click();
    const action = new QuestionsPage(this.page);
    await action.editAQuestion(questionId, editedQuestionText);
  }

  async deleteAQuestion(questionId: string, editedQuestionText: string) {
    await this.profileButton.click();
    const action = new QuestionsPage(this.page);
    await action.deleteAQuestion(questionId, editedQuestionText);
  }
  async createMultiQuestion(questionText: string, questionNum: number) {
    await this.questionsButton.click();
    const action = new QuestionsPage(this.page);
    const { obj, reversedObj } = await action.createMultiQuestion(
      questionText,
      questionNum
    );

    await this.profileButton.click();
    expect(await this.profileQuestionCount.textContent()).toBe("3");
    await action.checkIfOrderByCreatedTime(reversedObj);
    return obj;
  }

  async editMultiQuestion(questionObj: QuestionObjType) {
    await this.profileButton.click();
    const action = new QuestionsPage(this.page);
    const editedObj = await action.editMultiQuestion(questionObj);
    return editedObj;
  }

  async deleteMultiQuestion(questionObj: QuestionObjType) {
    await this.profileButton.click();
    const action = new QuestionsPage(this.page);
    await action.deleteMultiQuestion(questionObj);
  }
}
