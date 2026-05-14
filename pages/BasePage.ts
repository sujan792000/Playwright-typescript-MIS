import { Page } from '@playwright/test';
import { config } from '../utils/config';

/**
 * Base Page class - all page objects should extend this class
 * Provides common functionality and locators shared across pages
 */
export class BasePage {
  readonly page: Page;
  readonly baseURL: string;

  constructor(page: Page, baseURL?: string) {
    this.page = page;
    this.baseURL = baseURL || config.baseURL;
  }

  /**
   * Navigate to a specific path
   */
  async goto(path: string = ''): Promise<void> {
    const url = path ? `${this.baseURL}${path.startsWith('/') ? path : `/${path}`}` : this.baseURL;
    await this.page.goto(url);
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Enter text into an input field
   */
  async fill(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  /**
   * Click an element
   */
  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }     
  
}
