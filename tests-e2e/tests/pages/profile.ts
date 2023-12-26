import { type Locator, type Page, expect } from "@playwright/test";
import { QuestionPage } from "./question";
import { QuestionsPage } from "./questions";

export class ProfilePage {
  readonly page: Page;
  questionId: string | undefined;

  constructor(page: Page) {
    this.page = page;
    this.questionId;
  }

  async createAQuestion(questionText: string, i = 0) {
    const action = new QuestionsPage(this.page);
    this.questionId = await action.createAQuestion(questionText, i);
    return this.questionId;
  }

  async editAQuestion(questionId: string, editedQuestionText: string) {
    const action = new QuestionsPage(this.page);
    await action.editAQuestion(questionId, editedQuestionText);
  }

  async deleteAQuestion(questionId: string, editedQuestionText: string) {
    const action = new QuestionsPage(this.page);
    await action.deleteAQuestion(questionId, editedQuestionText);
  }
}
