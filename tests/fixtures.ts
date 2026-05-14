import { test as base } from '@playwright/test';
import { HomePage } from '../pages';
import { config } from '../utils/config';
import { LoginPage } from '../pages/LoginPage';
import { FileUpload } from '../utils/FileUpload';

/**
 * Extended test fixture with Page Object Model support
 * Use this to inject page objects into your tests
 */
export type TestOptions = {
  homePage: HomePage;
  fileUpload: FileUpload;
}

export const test = base.extend<TestOptions>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page, config.baseURL);
    await use(homePage);
  },

  fileUpload: async ({ page }, use) => {
    const fileUpload = new FileUpload(page);
    await use(fileUpload);
  }
});


export { expect } from '@playwright/test';
