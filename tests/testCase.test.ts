import { test, expect } from '@playwright/test';
import { Helper } from '../page-objects/helper';
import { JupiterPage } from '../page-objects/jupiterPage';

test('Test case 1 @Run', async ({ page }) => {
    test.setTimeout(60000);
    const h = new Helper(page);
    const _page = new JupiterPage(page);
    // await page.goto('https://jupiter.cloud.planittesting.com/#/');

    // From the home page go to contact page
    await _page.goToJupiterPage();
    await _page.goToContactPage();

    // Click submit button
    await _page.clickSubmitButton();

    // Verify error message
    await _page.verifyErrorMessages();

    // Populate mandatory fields
    await _page.populateMandatoryFields();

    // Validate errors are gone
    await _page.validateErrorMessagesGone();

});

test('Test case 2 @Run', async ({ page }) => {
    test.setTimeout(120000);
    const h = new Helper(page);
    const _page = new JupiterPage(page);
    // await page.goto('https://jupiter.cloud.planittesting.com/#/');

    // From the home page go to contact page
    await _page.goToJupiterPage();
    await _page.goToContactPage();

    // Populate mandatory fields

    // Click submit button

    // Validate successful submission message

});

test('Test case 3 @Run', async ({ page }) => {
    test.setTimeout(120000);
    const h = new Helper(page);
    const _page = new JupiterPage(page);
    // await page.goto('https://jupiter.cloud.planittesting.com/#/');

    // From the home page go to contact page
    await _page.goToJupiterPage();
    await _page.goToContactPage();

    // Populate mandatory fields

    // Click submit button

    // Validate successful submission message

});

