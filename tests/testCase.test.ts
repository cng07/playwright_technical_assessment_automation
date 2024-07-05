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

    let item1: string = 'Stuffed Frog';
    let item2: string = 'Fluffy Bunny';
    let item3: string = 'Valentine Bear';

    // const items = [item1, item2, item3];
    // let total = 0;

    await _page.goToJupiterPage();

    // Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear
    await _page.goToShopPage();
    await _page.buyItemsFromShop(item1, 2); // (itemName, quantity)
    await _page.buyItemsFromShop(item2, 5);
    await _page.buyItemsFromShop(item3, 3);    

    // Go to the cart page
    await _page.goToCartPage();

    // Verify the subtotal for each product is correct
    await _page.verifySubtotalOfItem(item1); // (itemName)
    await _page.verifySubtotalOfItem(item2);
    await _page.verifySubtotalOfItem(item3);

    // Verify the price for each product
    await _page.verifyPriceForEachProduct(item1);
    await _page.verifyPriceForEachProduct(item2);
    await _page.verifyPriceForEachProduct(item3);


    // Verify that total = sum(sub totals)
    // await _page.verifyTotalAndSubtotal();
    await _page.verifyTotalOfThreeItems(item1, item2, item3);

    // for (const item in items) {
    //     total += await _page.getSubtotalOfItem(item);
    // }
    // console.log(`${total}`);

    // console.log(await _page.getSubtotalOfItem(item1));
});

