import { test as base } from '@playwright/test';
import { HomePage, ArticlePage } from '../pages';
import { config } from '../utils/config';
import { FileUpload } from '../utils/FileUpload';

/**
 * Extended test fixture with Page Object Model support
 * Use this to inject page objects into your tests
 */
export type TestOptions = {
  homePage: HomePage;
  articlePage: ArticlePage;
}

export const test = base.extend<TestOptions>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page, config.baseURL);
    await use(homePage);
  },

  articlePage: async ({ page }, use) => {
    const articlePage = new ArticlePage(page);
    await use(articlePage);
  }
});


export { expect } from '@playwright/test';
