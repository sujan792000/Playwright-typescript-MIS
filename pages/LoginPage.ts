/** Log in with the provided credentials and navigate to the map. */

import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { config } from '../utils/config';

export class LoginPage extends BasePage {
  constructor(page: Page, baseURL?: string) {
    super(page, baseURL);
  }
  async login(page: any) : Promise<void> {
    await this.goto('/login');
    await this.fill('input[type="email"], input[type="text"]', config.username);
     await this.fill('input[type="password"]', config.password);
     await this.click('button[type="submit"]');
     await page.waitForURL('**/');
  }
} 