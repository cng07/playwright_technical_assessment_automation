import { Locator, Page, expect } from "@playwright/test";
import { Helper } from "./helper";
import exp from "constants";


export class JupiterPage {
    readonly page: Page
    readonly h: Helper

    buttonContact; buttonHome; buttonShop; buttonSubmit; errorMessageMain; errorMessageForename; errorMessageEmail; errorMessageMessageField;
    textForename; textEmail; textMessage; fieldForename; fieldEmail; fieldMessage; messageSuccess; buttonBack; totalValue; total;
    textSendingFeedback; progressBar; buttonCart; buttonBuyItem; itemPrice; itemQuantity; itemSubtotal; subtotalValue; itemSubtotalA; 
    itemSubtotalB; itemSubtotalC
    :Locator
    // Locator should be on all variables above

    constructor(page: Page) {
        this.page = page
        this.h = new Helper(this.page);

        this.buttonHome = page.getByRole('link', { name: 'Home' });
        this.buttonShop = page.getByRole('link', { name: 'Shop', exact: true });
        this.buttonContact = page.getByRole('link', { name: 'Contact' });
        this.buttonSubmit = page.getByRole('link', { name: 'Submit' });
        this.errorMessageMain = page.getByText("We welcome your feedback - but we won't get it unless you complete the form correctly.");
        this.errorMessageForename = page.getByText("Forename is required");
        this.errorMessageEmail = page.getByText("Email is required");
        this.errorMessageMessageField = page.getByText("Message is required");
        this.textForename = page.getByText("Forename *");
        this.textEmail = page.getByText("Email *");
        this.textMessage = page.getByText("Message *");
        this.fieldForename = page.getByPlaceholder('John', {exact: true});
        this.fieldEmail = page.getByPlaceholder('john.example@planit.net.au');
        this.fieldMessage = page.getByPlaceholder('Tell us about it..');
        this.textSendingFeedback = page.getByRole('heading', { name: 'Sending Feedback'});
        this.progressBar = page.locator('.progress');
        // this.messageSuccess = page.getByText("Thanks John, we appreciate your feedback.");
        this.buttonBack = page.getByRole('link', {name: '« Back'});
        this.buttonCart = page.getByRole('link', {name: 'Cart ('});
    }

    async goToJupiterPage() {
        await this.page.goto(await this.h.getLinkOnCSV(0,"Value"));
        await expect(this.page.getByText('Welcome to Jupiter Toys, a magical world for good girls and boys.')).toBeVisible({timeout: 30000});
    }

    async goToContactPage() {
        await this.buttonContact.click();
    }

    async goToShopPage() {
        await this.buttonShop.click();
    }

    async goToCartPage() {
        await this.buttonCart.click();
    }

    async clickSubmitButton() {
        await this.buttonSubmit.click();
    }

    async verifyErrorMessages() {
        await expect(this.errorMessageMain).toBeVisible();
        await expect(this.errorMessageForename).toBeVisible();
        await expect(this.errorMessageEmail).toBeVisible();
        await expect(this.errorMessageMessageField).toBeVisible();

        // color: #b94a48 = rgb(185, 74, 72)
        await expect(this.errorMessageMain).toHaveCSS('color', 'rgb(185, 74, 72)');
        await expect(this.errorMessageForename).toHaveCSS('color', 'rgb(185, 74, 72)');
        await expect(this.errorMessageEmail).toHaveCSS('color', 'rgb(185, 74, 72)');
        await expect(this.errorMessageMessageField).toHaveCSS('color', 'rgb(185, 74, 72)');

        await expect(this.textForename).toHaveCSS('color', 'rgb(185, 74, 72)');
        await expect(this.textEmail).toHaveCSS('color', 'rgb(185, 74, 72)');
        await expect(this.textMessage).toHaveCSS('color', 'rgb(185, 74, 72)');
    }

    async populateMandatoryFields(forename: string, email: string, message: string) {
        await this.fieldForename.fill(forename);
        await this.fieldEmail.fill(email)
        await this.fieldMessage.fill(message);
    }

    async validateErrorMessagesGone() {
        await expect(this.errorMessageMain).toHaveCount(0);
        await expect(this.errorMessageForename).toHaveCount(0);
        await expect(this.errorMessageEmail).toHaveCount(0);
        await expect(this.errorMessageMessageField).toHaveCount(0);

        await expect(this.textForename).toHaveCSS('color', 'rgb(51, 51, 51)');
        await expect(this.textEmail).toHaveCSS('color', 'rgb(51, 51, 51)');
        await expect(this.textMessage).toHaveCSS('color', 'rgb(51, 51, 51)');
    }

    async validateSuccessfulSubmissionMessage(forename: string) {
        await expect(this.textSendingFeedback).toBeVisible();
        await expect(this.progressBar).toBeVisible();

        this.messageSuccess = this.page.getByText("Thanks "+ forename +", we appreciate your feedback.");
        await expect(this.messageSuccess).toBeVisible({timeout: 60000});
        await expect(this.messageSuccess).toHaveCSS('color', 'rgb(70, 136, 71)');
        await expect(this.messageSuccess).toHaveCSS('background-color', 'rgb(223, 240, 216)');
        await expect(this.buttonBack).toBeVisible();
    }

    async buyItemsFromShop(item: string, quantity: number) {

        this.buttonBuyItem = this.page.locator("(//h4[contains(.,'"+ item +"')]//following::a[@class='btn btn-success'])[1]");
        
        for (let i = 0; i < quantity; i++) {
            await this.buttonBuyItem.click();
            await this.h.pause(2000);
        }
    }

    async verifyPriceForEachProduct(item:string) {
        this.itemPrice = this.page.locator("(//td[contains(.,'"+ item +"')]//following::td[@class='ng-binding'])[1]")
        let price = await this.itemPrice.innerText();
        if (item == "Teddy Bear"){
            expect(price).toBe(await this.h.getLinkOnCSV(1,"Value"));
        }
        if (item == "Stuffed Frog"){
            expect(price).toBe(await this.h.getLinkOnCSV(2,"Value"));
        }
        if (item == "Handmade Doll"){
            expect(price).toBe(await this.h.getLinkOnCSV(3,"Value"));
        }
        if (item == "Fluffy Bunny"){
            expect(price).toBe(await this.h.getLinkOnCSV(4,"Value"));
        }
        if (item == "Smiley Bear"){
            expect(price).toBe(await this.h.getLinkOnCSV(5,"Value"));
        }
        if (item == "Funny Cow"){
            expect(price).toBe(await this.h.getLinkOnCSV(6,"Value"));
        }
        if (item == "Valentine Bear"){
            expect(price).toBe(await this.h.getLinkOnCSV(7,"Value"));
        }
        if (item == "Smiley Face"){
            expect(price).toBe(await this.h.getLinkOnCSV(8,"Value"));
        }
    }

    async verifySubtotalOfItem(item: string) {
        this.itemPrice = this.page.locator("(//td[contains(.,'"+ item +"')]//following::td[@class='ng-binding'])[1]")
        this.itemQuantity = this.page.locator("(//td[contains(.,'"+ item +"')]//following::input[@name='quantity'])[1]");
        this.itemSubtotal = this.page.locator("(//td[contains(.,'"+ item +"')]//following::td[@class='ng-binding'])[2]");
        // console.log(await this.itemPrice.innerText());
        // console.log(await this.itemQuantity.getAttribute('value'));

        let itemPriceValue: number = (await this.itemPrice.innerText()).replace('$', '');
        let itemQuantityValue: number = await this.itemQuantity.getAttribute('value');
        let itemSubtotalValue: number = parseFloat((await this.itemSubtotal.innerText()).replace('$', '').trim());

        // console.log(itemPriceValue);
        // console.log(itemQuantityValue);
        // console.log(itemSubtotalValue);

        expect(itemPriceValue * itemQuantityValue).toBe(itemSubtotalValue);
    }

    async verifyTotalOfThreeItems(itemA: string, itemB: string, itemC: string) {
        this.itemSubtotalA = this.page.locator("(//td[contains(.,'"+ itemA +"')]//following::td[@class='ng-binding'])[2]");
        this.itemSubtotalB = this.page.locator("(//td[contains(.,'"+ itemB +"')]//following::td[@class='ng-binding'])[2]");
        this.itemSubtotalC = this.page.locator("(//td[contains(.,'"+ itemC +"')]//following::td[@class='ng-binding'])[2]");

        let itemSubtotalValueA: number = parseFloat((await this.itemSubtotalA.innerText()).replace('$', '').trim());
        let itemSubtotalValueB: number = parseFloat((await this.itemSubtotalB.innerText()).replace('$', '').trim());
        let itemSubtotalValueC: number = parseFloat((await this.itemSubtotalC.innerText()).replace('$', '').trim());

        this.total = this.page.locator("//strong[@class='total ng-binding']");
        let totalValue: number = parseFloat((await this.total.innerText()).replace('Total: ', '').trim());

        expect(itemSubtotalValueA + itemSubtotalValueB + itemSubtotalValueC).toBe(totalValue);
    }

    async getSubtotalOfItem(item: string) {
        this.itemSubtotal = this.page.locator("(//td[contains(.,'"+ item +"')]//following::td[@class='ng-binding'])[2]");
        let itemSubtotalValue: number = parseFloat((await this.itemSubtotal.innerText()).replace('$', '').trim());

        this.total = this.page.locator("//strong[@class='total ng-binding']");
        let totalValue: number = parseFloat((await this.total.innerText()).replace('Total: ', '').trim());
        // return itemSubtotalValue;
        return totalValue;
    }
    

    async verifyTotalAndSubtotal() {
        let index = 3; // Start with the first locator index
        let elementsFound = true;
        let values: string[] = [];

        this.subtotalValue = this.page.locator('(//td[@class="ng-binding"])['+ index +']');

        await expect(this.subtotalValue).toBeVisible();

        do {
            for (let i = 3; i < 10; i+3) {
                await expect(this.subtotalValue).toBeVisible();
            }
        }
        while(expect(this.subtotalValue).toBeVisible()) {
          
        }

     
    }


}