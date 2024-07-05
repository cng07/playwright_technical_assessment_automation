import { test, expect } from '@playwright/test';
import { Helper } from '../page-objects/helper';
import { JupiterPage } from '../page-objects/jupiterPage';

test('Test case 1 @Run', async ({ page }) => {
    test.setTimeout(60000);
    const h = new Helper(page);
    const _page = new JupiterPage(page);
    // await page.goto('https://jupiter.cloud.planittesting.com/#/');

    let forename: string = "Firstname";
    let email: string = "firstname@email.com";
    let message: string = "Test message automation"

    // From the home page go to contact page
    await _page.goToJupiterPage();
    await _page.goToContactPage();

    // Click submit button
    await _page.clickSubmitButton();

    // Verify error message
    await _page.verifyErrorMessages();

    // Populate mandatory fields
    await _page.populateMandatoryFields(forename, email, message);

    // Validate errors are gone
    await _page.validateErrorMessagesGone();

});

test('Test case 2 @Run', async ({ page }) => {

    // Run this test 5 times to ensure 100% pass rate
    for (let i = 0; i < 5; i++) {
        test.setTimeout(60000);
        const h = new Helper(page);
        const _page = new JupiterPage(page);

        let forename: string = "Carlos";
        let email: string = "Carlos@email.com";
        let message: string = "Test message automation"

        // From the home page go to contact page
        await _page.goToJupiterPage();
        await _page.goToContactPage();

        // Populate mandatory fields
        await _page.populateMandatoryFields(forename, email, message);

        // Click submit button
        await _page.clickSubmitButton();

        // Validate successful submission message
        await _page.validateSuccessfulSubmissionMessage(forename);

        await h.pause(5000);
    }
});


test('Test case 3 @Run', async ({ page }) => {
    test.setTimeout(60000);
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

