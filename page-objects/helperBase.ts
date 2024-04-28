import {Locator, Page } from "@playwright/test";

export class HelperBase {
    readonly page: Page;
    readonly allowAllCookiesButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.allowAllCookiesButton = page.getByRole('button', { name: 'Allow all cookies' });        
    }

    async acceptCookies(){
        await this.allowAllCookiesButton.click();
        console.log('Cookies accepted');        
    }
    async waitForNumberOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds * 1000);
    }
}