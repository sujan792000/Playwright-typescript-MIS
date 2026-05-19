import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ArticlePage - Page Object for article creation
 */
export class ArticlePage extends BasePage {
  // Page elements
  private readonly articleTitleInput: Locator;
  private readonly articleDescriptionInput: Locator;
  private readonly articleBodyTextarea: Locator;
  private readonly articleTagsInput: Locator;
  private readonly publishButton: Locator;
  private readonly articleTitle: Locator;
  private readonly deleteButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Define locators
    this.articleTitleInput = page.getByPlaceholder('Article Title');
    this.articleDescriptionInput = page.getByPlaceholder("What's this article about?");
    this.articleBodyTextarea = page.getByPlaceholder('Write your article (in markdown)');
    this.articleTagsInput = page.getByPlaceholder('Enter tags');
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    this.articleTitle = page.locator('.article-page h1');
    this.deleteButton = page.getByRole('button', { name: 'Delete Article' }).first();
  }

  /**
   * Navigate to new article page
   */
  async navigateToNewArticle(): Promise<void> {
    await this.navigate('https://conduit.bondaracademy.com/editor');
    await this.waitForPageLoad();
  }

  /**
   * Create a new article
   * @param title - Article title
   * @param description - Article description
   * @param body - Article body content
   * @param tags - Article tags (optional)
   */
  async createArticle(
    title: string,
    description: string,
    body: string,
    tags?: string
  ): Promise<void> {
    await this.articleTitleInput.fill(title);
    await this.articleDescriptionInput.fill(description);
    await this.articleBodyTextarea.fill(body);
    
    if (tags) {
      await this.articleTagsInput.fill(tags);
      // Press Enter to add tag
      await this.articleTagsInput.press('Enter');
    }
    
    await this.publishButton.click();
    // Wait for article page to load
    await this.page.waitForURL('**/article/**', { timeout: 10000 });
  }

  /**
   * Verify article is created and displayed
   * @param expectedTitle - Expected article title
   */
  async verifyArticleCreated(expectedTitle: string): Promise<void> {
    await this.verifyElementVisible(this.articleTitle);
    await this.verifyElementText(this.articleTitle, expectedTitle);
    console.log(`✓ Article created: ${expectedTitle}`);
  }

  /**
   * Delete the current article
   */
  async deleteArticle(): Promise<void> {
    await this.deleteButton.click();
    await this.page.waitForLoadState('networkidle');
    console.log('✓ Article deleted');
  }

  /**
   * Get article title
   * @returns The displayed article title
   */
  async getArticleTitle(): Promise<string> {
    return await this.getTextContent(this.articleTitle);
  }


  /**
   * Post a comment to the article
   */
  async addCommentToTheArticle(comment: string) : Promise<void>{
    
  }
}

