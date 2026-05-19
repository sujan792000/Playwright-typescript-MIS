import { Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class HomePage extends BasePage {
  constructor(page: Page, baseURL?: string) {
    super(page, baseURL);
  }

  /**
   * Navigate to home page
   */
  async navigate(): Promise<void> {
    await this.goto('/');
  }

    /**
   * Click New Article link
   */
  async clickNewArticle(): Promise<void> {
    await this.click(this.page.getByRole('link', { name: 'New Article' }));
    await this.waitForPageLoad();
  }
}
