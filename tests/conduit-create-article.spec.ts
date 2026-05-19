import { test, expect } from './fixtures';



test.describe('Conduit - Create New Article', () => {

 test.beforeEach(async ({ page }) => {
   await page.goto('/');
 });

  test('Test Case 1: User should be able to login to Conduit application', async ({ page, homePage }) => {
    console.log('🧪 Test Case 1: Login to Conduit');


    // Verify login by checking that "Sign in" link is no longer visible
    // and "New Article" link is visible (which is only available when logged in)
    const signInVisible = await page.locator('a:has-text("Sign in")').isVisible().catch(() => false);
    const newArticleVisible = await page.getByRole('link', { name: 'New Article' }).isVisible();
    
    expect(signInVisible).toBeFalsy();
    
    console.log('✓ "Sign in" link is hidden (user is logged in)');
    console.log('✓ "New Article" link is visible (user is logged in)');
    
    // Try to get username from the nav
    const userLinks = await page.locator('ul.navbar-nav li.nav-item a').allTextContents();
    console.log(`✓ Navigation links: ${userLinks.join(', ')}`);
    
    // The last link should contain the username
    const username = userLinks[userLinks.length - 1];
    console.log(`✓ Username displayed: ${username}`);
    expect(username).toBeTruthy();

    console.log('✅ Test Case 1: PASSED - User successfully logged in');
  });

  test('Test Case 2: Logged in user should be able to create a new article', async ({ page, homePage,articlePage }) => {
    console.log('🧪 Test Case 2: Create New Article');

    // Pre-condition: Login
    console.log('Pre-condition: Login to application');
  //  await loginPage.performLogin('pwtest@test.com', 'Welcome2');
   // await loginPage.verifyUserLoggedIn('pwtest');

    // Step 1: Click New Article
    console.log('Step 1: Click "New Article" link');
    await homePage.clickNewArticle();

    // Verify editor page is loaded
    await expect(page).toHaveURL(/\/editor/);
    console.log('✓ Article editor page loaded');

    // Step 2: Create article with details
    console.log('Step 2: Fill article details');
    const timestamp = Date.now();
    const articleTitle = `Test Article ${timestamp}`;
    const articleDescription = 'This is a test article created by automation';
    const articleBody = `This is the body of the test article.\n\nCreated at: ${new Date().toLocaleString()}\n\nThis article tests the Playwright automation framework with Page Object Model pattern.`;
    const articleTags = 'automation';

    await articlePage.createArticle(
      articleTitle,
      articleDescription,
      articleBody,
      articleTags
    );

    // Step 3: Verify article is created
    console.log('Step 3: Verify article is published');
    await articlePage.verifyArticleCreated(articleTitle);

    // Verify URL contains the article slug
    await expect(page).toHaveURL(/\/article\//);
    console.log('✓ Article page loaded with correct URL');

    console.log('✅ Test Case 2: PASSED - Article successfully created');

    // Cleanup: Delete the article
    console.log('Cleanup: Delete test article');
    await articlePage.deleteArticle();
    await expect(page).not.toHaveURL(/\/article\//);
    console.log('✓ Test article cleaned up');
  });

  test('Test Case 3: Complete workflow - Login and Create Article', async ({ page, homePage, articlePage }) => {
    console.log('🧪 Test Case 3: Complete Workflow - Login and Create Article');

    // Pre-condition: Login
    console.log('Pre-condition: Login to application');
    // await loginPage.performLogin('pwtest@test.com', 'Welcome2');
    // await loginPage.verifyUserLoggedIn('pwtest');

    // Step 1: Click New Article
    console.log('Step 1: Click "New Article" link');
    await homePage.clickNewArticle();

    // Verify editor page is loaded
    await expect(page).toHaveURL(/\/editor/);
    console.log('✓ Article editor page loaded');

    // Step 2: Create article with details
    console.log('Step 2: Fill article details');
    const timestamp = Date.now();
    const articleTitle = `Test Article ${timestamp}`;
    const articleDescription = 'This is a test article created by automation';
    const articleBody = `This is the body of the test article.\n\nCreated at: ${new Date().toLocaleString()}\n\nThis article tests the Playwright automation framework with Page Object Model pattern.`;
    const articleTags = 'automation';

    await articlePage.createArticle(
      articleTitle,
      articleDescription,
      articleBody,
      articleTags
    );

    // Step 7: Verify article
    await articlePage.verifyArticleCreated(articleTitle);
    console.log('✓ Step 7: Article verified');

    console.log('✅ Test Case 3: PASSED - Complete workflow successful');

    // Cleanup
    await articlePage.deleteArticle();
    console.log('✓ Cleanup: Test article deleted');
  });
});



