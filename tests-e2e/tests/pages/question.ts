//it is equal client/src/pages/QuestionPage.tsx
//in other word, can see the page of question, answer, comment
//localhost:3000/questions/id
import { expect, type Locator, type Page } from "@playwright/test";
import { type AnswerType } from "../utils/dummyData";
import { QuestionsPage } from "./questions";

export class QuestionPage {
  readonly page: Page;

  readonly addAQuestionButton: Locator;
  readonly questionTextarea: Locator;
  readonly addQuestionButton: Locator;
  readonly questionLink: Locator;

  readonly questionDiv: Locator;
  readonly addAnAnswerButton: Locator;
  readonly addAnswerButton: Locator;

  readonly addACommentButton: Locator;
  readonly commentTextarea: Locator;
  readonly addCommentButton: Locator;

  readonly editCommentButton: Locator;
  readonly editAnswerButton: Locator;
  readonly editQuestionButton: Locator;

  constructor(page: Page, questionId: string) {
    this.page = page;

    this.addAQuestionButton = page.getByText("Add a question");
    this.questionTextarea = page.locator("#question");
    this.addQuestionButton = page.getByText("Add question");

    this.questionDiv = page.getByTestId(questionId);
    this.questionLink = this.questionDiv.locator(`a[href^="/questions/"]`);
    this.addAnAnswerButton = page.getByText("Add an Answer");
    this.addAnswerButton = page.getByText("Add Answer");

    this.addACommentButton = page.getByText("Add a Comment");
    this.commentTextarea = page.locator("#comment");
    this.addCommentButton = page.getByText("Add Comment");

    this.editCommentButton = page.getByText("Edit Comment");
    this.editAnswerButton = page.getByText("Edit Answer");
    this.editQuestionButton = page.getByText("Edit Question");
  }

  async clickTheQuestionToInsideOfQuestion() {
    const action = new QuestionsPage(this.page);
    await action.scrollDown(this.page, this.questionDiv);
    await this.questionLink.click();
  }

  async createAnAnswer(answerObject: AnswerType) {
    await this.clickTheQuestionToInsideOfQuestion();
    await this.addAnAnswerButton.click();

    for (const key in answerObject) {
      await this.page.locator(`#${key}`).fill(`${answerObject[key]}`);
    }
    await this.addAnswerButton.click();

    // check if the answerObject is visible in 8s
    for (const key in answerObject) {
      await this.page
        .getByText(answerObject[key])
        .waitFor({ state: "visible", timeout: 8000 });
      await expect(this.page.getByText(answerObject[key])).toBeVisible();
    }

    let answerIdDiv = this.page.locator('[data-testid^="answerId-"]');
    const answerId = await answerIdDiv.getAttribute("data-testid");
    answerIdDiv = this.page.getByTestId(answerId!);

    // valid if there are star answers in the answerId element
    for (const key in answerObject) {
      await expect(answerIdDiv).toContainText(`${answerObject[key]}`);
    }

    return answerId;
  }

  async createAComment(commentText: string) {
    await this.clickTheQuestionToInsideOfQuestion();

    await this.addACommentButton.click();
    await this.commentTextarea.fill(commentText);
    await this.addCommentButton.click();

    // check if the commentText is visible in 8s
    await this.page
      .getByText(commentText)
      .waitFor({ state: "visible", timeout: 8000 });
    await expect(this.page.getByText(commentText)).toBeVisible();

    let commentIdDiv = this.page.locator('[data-testid^="commentId-"]');
    const commentId = await commentIdDiv.getAttribute("data-testid");
    commentIdDiv = this.page.getByTestId(commentId!);

    // check if the commentText in the commentIdDiv
    await expect(commentIdDiv).toContainText(`${commentText}`);

    return commentId;
  }

  async editAComment(commentId: string, editedCommentText: string) {
    await this.clickTheQuestionToInsideOfQuestion();

    const commentDiv = this.page.locator(`[data-testid=${commentId}]`);
    await commentDiv.locator('svg[data-testid="EditOutlinedIcon"]').click();

    await this.commentTextarea.fill(`${editedCommentText}`);
    await this.editCommentButton.click();

    // check if the editDummy.comment is visible in 8s
    await this.page
      .locator(`text=${editedCommentText}`)
      .waitFor({ state: "visible", timeout: 8000 });

    await expect(this.page.locator(`text=${editedCommentText}`)).toBeVisible();

    // check if the editedCommentText in the commentIdDiv
    await expect(commentDiv).toContainText(`${editedCommentText}`);
  }

  async editAnAnswer(answerId: string, editedAnswer: AnswerType) {
    await this.clickTheQuestionToInsideOfQuestion();

    const answerDiv = this.page.locator(`[data-testid=${answerId}]`);
    await answerDiv
      .locator(`button[data-testid="EditOutlinedIcon-${answerId}"]`)
      .click();

    for (const key in editedAnswer) {
      await this.page.locator(`#${key}`).fill(`${editedAnswer[key]}`);
    }
    await this.editAnswerButton.click();

    // check if the editDummy.answer is visible in 8s
    for (const key in editedAnswer) {
      await this.page
        .locator(`text=${editedAnswer[key]}`)
        .waitFor({ state: "visible", timeout: 8000 });
      await expect(
        this.page.locator(`text=${editedAnswer[key]}`)
      ).toBeVisible();
    }

    // valid if there are editedAnswers in the answerId element
    for (const key in editedAnswer) {
      await expect(answerDiv).toContainText(`${editedAnswer[key]}`);
    }
  }
  async editAQuestion(questionId: string, editedQuestionText: string) {
    await this.clickTheQuestionToInsideOfQuestion();

    const action = new QuestionsPage(this.page);
    await action.editAQuestion(questionId, editedQuestionText);
  }

  async deleteAComment(commentId: string, editedCommentText: string) {
    await this.clickTheQuestionToInsideOfQuestion();

    const commentDiv = this.page.locator(`[data-testid=${commentId}]`);
    await commentDiv.locator('svg[data-testid="DeleteOutlineIcon"]').click();

    // check if the editDummy.comment is visible in 8s
    await this.page
      .locator(`text=${editedCommentText}`)
      .waitFor({ state: "hidden", timeout: 8000 });

    await expect(
      this.page.locator(`text=${editedCommentText}`)
    ).not.toBeVisible();

    await expect(commentDiv).not.toBeVisible();
  }

  async deleteAnAnswer(answerId: string, editedAnswer: AnswerType) {
    await this.clickTheQuestionToInsideOfQuestion();

    const answerDiv = this.page.locator(`[data-testid=${answerId}]`);
    await answerDiv
      .locator(`button[data-testid="DeleteOutlineIcon-${answerId}"]`)
      .click();

    for (const key in editedAnswer) {
      await this.page
        .locator(`text=${editedAnswer[key]}`)
        .waitFor({ state: "hidden", timeout: 8000 });
      await expect(
        this.page.locator(`text=${editedAnswer[key]}`)
      ).not.toBeVisible();
    }

    await expect(answerDiv).not.toBeVisible();
  }

  async deleteAQuestion(questionId: string, editedQuestionText: string) {
    await this.clickTheQuestionToInsideOfQuestion();

    const action = new QuestionsPage(this.page);
    await action.deleteAQuestion(questionId, editedQuestionText);
  }
}
