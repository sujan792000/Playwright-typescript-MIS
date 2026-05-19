import { expect, test as setup } from "@playwright/test";
import { config } from '../utils/config';

setup('authentication',async ({page}) => {
  const AUTH_FILE = '.auth/user.json';
  await page.goto(`${config.baseURL}/login`);
  await page.locator('[placeholder="Email"]').fill(config.username);
  await page.locator('[placeholder="Password"]').fill(config.password);
  await Promise.all([
    page.waitForNavigation({ url: '**/' }),
    page.click('button[type="submit"]'),
  ]);

  await page.context().storageState({ path: AUTH_FILE });
});



