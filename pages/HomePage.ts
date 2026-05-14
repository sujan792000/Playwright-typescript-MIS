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
}
