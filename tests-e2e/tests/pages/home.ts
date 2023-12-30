// For Tests on: client/src/pages/HomePage.tsx
import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  readonly homeButton: Locator;
  readonly aboutButton: Locator;
  readonly profileButton: Locator;
  readonly questionsButton: Locator;
  readonly usersButton: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeButton = page.getByRole("link", { name: "Home" });
    this.aboutButton = page.getByRole("link", { name: "About" });
    this.profileButton = page.getByRole("link", { name: "Profile" });
    this.questionsButton = page.getByRole("link", { name: "Questions" });
    this.usersButton = page.getByRole("link", { name: "Users" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.logoutButton = page.getByRole("button", { name: "Logout" });
  }

  async checkIfHasTitle() {
    await expect(this.page).toHaveTitle(/STAR/);
  }

  async clickHomeButton() {
    await expect(this.homeButton).toBeVisible();
    await this.homeButton.click();
    await expect(this.page.getByText("Guarantee")).toBeVisible();
  }

  async clickAboutButton() {
    await expect(this.aboutButton).toBeVisible();
    await this.aboutButton.click();
    await expect(
      this.page.getByText("The STAR Method", { exact: true })
    ).toBeVisible();
  }

  async clickProfileButton() {
    await expect(this.profileButton).toBeVisible();
    await this.profileButton.click();
    await expect(this.page.getByText("Your Profile")).toBeVisible();
  }

  async clickQuestionsButton() {
    await expect(this.questionsButton).toBeVisible();
    await this.questionsButton.click();
    await expect(this.page.getByText("All Questions")).toBeVisible();
  }

  async clickUsersButton() {
    await expect(this.usersButton).toBeVisible();
    await this.usersButton.click();
    await expect(this.page.getByText("Users Page")).toBeVisible();
  }

  async clickLogoutButton() {
    await expect(this.logoutButton).toBeVisible();
    await this.logoutButton.click();
    await expect(this.loginButton).toBeVisible();
  }
}
