import { Locator, Page } from "@playwright/test";

export class AssetsPage {
    readonly page: Page;
    readonly checkboxForAllAssets: Locator;
    readonly bulkEditButton: Locator;
    readonly fieldToBulkEdit: Locator;
    readonly customValueForField: Locator;
    readonly buttonSaveAndApply: Locator;
    readonly modalTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkboxForAllAssets = page.locator("(//div[@class='box'])[1]");
        this.bulkEditButton = page.locator('[data-test-id="inventory__bulk-button"]');
        this.fieldToBulkEdit = page.locator('#rc_select_0');
        this.customValueForField = page.locator('[data-test-id="domain-value"]');
        this.buttonSaveAndApply = page.locator("//button/div[contains(.,'Save and apply')]");
        this.modalTitle = page.locator('[data-test-id="bulk-edit-modal-title"]');        
    }

    async selectAllAssets() {
        await this.checkboxForAllAssets.click();
    }

    async clickBulkEdit() {
        await this.bulkEditButton.click();
    }

    async typeValueForFieldToBulkEdit({ field }: { field: string }) {
        await this.fieldToBulkEdit.click();
        await this.fieldToBulkEdit.fill(field);
        await this.fieldToBulkEdit.press('Enter');
    }

    async fillCustomValueForField({ value }: { value: string }) {
        await this.customValueForField.waitFor({ state: 'visible' });       
        await this.customValueForField.click();
        await this.customValueForField.fill(value);
    }
    async getTextFromModalTitle() {
        const text = await this.modalTitle.textContent();
        return text;
    }

    async clickButtonSaveAndApply() {
        await this.buttonSaveAndApply.click();
    }

    async getAllPresentAssets() {
        await this.page.waitForSelector('//a[contains(@data-test-id, "inventory__asset-domain-link--")]/span', { state: 'visible' });
        const assets = await this.page.locator('//a[contains(@data-test-id, "inventory__asset-domain-link--")]/span').allTextContents();
        return assets;
    }
}
