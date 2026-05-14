import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Page } from '@playwright/test';

export class FileUpload {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async uploadCSV(csvContent: string): Promise<void> {
    const tmpFile = path.join(os.tmpdir(), `test-${Date.now()}.csv`);
    fs.writeFileSync(tmpFile, csvContent);
    await this.page.setInputFiles('input[type="file"]', tmpFile);
    fs.unlinkSync(tmpFile);
  }
}