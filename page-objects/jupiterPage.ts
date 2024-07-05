import { Locator, Page, expect } from "@playwright/test";
import { Helper } from "./helper";
import exp from "constants";


export class JupiterPage {
    readonly page: Page
    readonly h: Helper

    buttonContact; buttonHome; buttonShop; buttonSubmit; errorMessageMain; errorMessageForename; errorMessageEmail; errorMessageMessageField;
    textForename; textEmail; textMessage; fieldForename; fieldEmail; fieldMessage; messageSuccess; buttonBack;
    textSendingFeedback; progressBar
    :Locator
    // Locator should be on all variables above

    constructor(page: Page) {
        this.page = page
        this.h = new Helper(this.page);

        this.buttonHome = page.getByRole('link', { name: 'Home' });
        this.buttonShop = page.getByRole('link', { name: 'Shop' });
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
    }

    async goToJupiterPage() {
        await this.page.goto(await this.h.getLinkOnCSV(0,"Link"));
        await expect(this.page.getByText('Welcome to Jupiter Toys, a magical world for good girls and boys.')).toBeVisible({timeout: 30000});
    }

    async goToContactPage() {
        await this.buttonContact.click();
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



}