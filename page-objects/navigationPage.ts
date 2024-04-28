import { Locator, Page } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;
  readonly buttonInventory: Locator;   

  constructor(page: Page) {
    this.page = page;
    this.buttonInventory = page.locator('[data-test-id="inventory-button"] path')

  }
async clickInventory(){
    await this.buttonInventory.click();
}
}
