import {test, expect} from '@playwright/test';
import { DataGenerator } from '../jsonbuilder/updateAssetJson';
import { PageManager } from '../page-objects/pageManager';


test.beforeEach(async ({page}) => {
  await page.goto('/');
});

test('bulk edit using mocking API', async ({ page }) => {
  const countOfAssets = 250;
  const originalDomainName = "AndriiKalnytskyi.com";
  const updatedDomainName = "TEST";
  const analyticListViewRoute = '**/*/api/gateway?operation=analyticListView';
  const username = "testqelansweeper@gmail.com";
  const password = "LSTest2024";
  const generator = new DataGenerator(originalDomainName);
  const data = generator.generateFakeData(countOfAssets);
  
  await page.route(analyticListViewRoute, async (route) => {
     await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(data),
      });

  });
  const pm = new PageManager(page);
  await pm.instanceLoginPage().acceptCookies();
  await pm.instanceLoginPage().clickSignIn();
  await pm.instanceLoginPage().typeLogin({ username: username });
  await pm.instanceLoginPage().typePassword({ password: password });
  await pm.instanceLoginPage().clickLogin();
  await pm.instanceLoginPage().chooseYourSite();
  await pm.instanceNavigationPage().clickInventory();
  const presentDomainName = await pm.instanceAssetsPage().getAllPresentAssets();
  expect(presentDomainName).toContain(originalDomainName);
  expect(presentDomainName).toHaveLength(250);
  await pm.instanceAssetsPage().selectAllAssets();
  await pm.instanceAssetsPage().clickBulkEdit();
  await pm.instanceAssetsPage().typeValueForFieldToBulkEdit({ field: 'Domain' });
  await pm.instanceAssetsPage().fillCustomValueForField({ value: updatedDomainName });
  const modalTitleText = await pm.instanceAssetsPage().getTextFromModalTitle();
  expect(modalTitleText).toBe("Bulk edit - 250 assets");
  generator.updateAssetDomain(updatedDomainName);
  const data_update = generator.generateFakeData(countOfAssets);
  await page.unroute(analyticListViewRoute);

  await page.route(analyticListViewRoute, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(data_update),
    });
    console.log('Updated data should now be served.');
  });
  await pm.instanceAssetsPage().clickButtonSaveAndApply();
  await page.waitForTimeout(10000);
  const presentDomainNameAfterUpdate = await pm.instanceAssetsPage().getAllPresentAssets();  
  expect(presentDomainNameAfterUpdate).toHaveLength(250);
  expect(presentDomainNameAfterUpdate).toEqual(presentDomainNameAfterUpdate);  
});