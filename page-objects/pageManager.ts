import { Page, expect } from "@playwright/test";
import { LoginPage } from '../page-objects/loginPage';
import { NavigationPage } from '../page-objects/navigationPage';
import { AssetsPage } from '../page-objects/assetsPage';
import { HelperBase } from '../page-objects/helperBase';



export class PageManager {
    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly navigationPage: NavigationPage;
    private readonly assetsPage: AssetsPage;
    private readonly helperBase: HelperBase;
    



    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.navigationPage = new NavigationPage(this.page);
        this.assetsPage = new AssetsPage(this.page);
        
    }
    instanceLoginPage(){
        return this.loginPage;
    }
    instanceNavigationPage(){
        return this.navigationPage;
    }
    instanceAssetsPage(){
        return this.assetsPage;
    } 

}