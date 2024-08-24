import {dataGen} from "../helpers/dataGen.js";
import {checkout} from "./checkout.js";

class OrderDetails {
    elements={
        container:()=>cy.get('.form-wrapper'),
        emailLocator:'#email',
        fullNameLocator:'#name_full',
        countryCodeLocator:'.form_element-phone__country-code',
        phoneLocator:'#phone',
        countryResidenceLocator:'#select2-id_country-container',
        countryResidenceOption:'.select2-results__options',
        footerLocator:'.smart-footer__content',
        nextButtonLocator:'.smart-footer-next-button',
        phoneErrorLocator:'.form_element-phone > .errors > li',

    }

    checkThaPageWasOpened(){
        cy.url().should('include', '/order/customer-auth');
        this.elements.container().should('be.visible');
    }

    fillForm(country) {
        let userData ={}
        cy.get(this.elements.emailLocator).should('be.visible').type(dataGen.randomEmail());
        cy.get(this.elements.fullNameLocator).should('be.visible').type(dataGen.randomName());
        cy.get(this.elements.countryCodeLocator).should('be.visible');
        cy.get(this.elements.countryCodeLocator).click()
        cy.get('.select2-results__options').contains(country).click();

        cy.get(this.elements.phoneLocator).should('be.visible').type('11111111');
        cy.get(this.elements.phoneErrorLocator).should('not.be.visible');
        cy.get(this.elements.countryResidenceLocator).should('be.visible').click();
        cy.get(this.elements.countryResidenceOption).should('be.visible').contains(country).click();
        userData={
            email: dataGen.randomEmail(),
            fullName: dataGen.randomName(),
        }
        return userData
    }

    clickNextButton(){
        cy.get(this.elements.footerLocator).should('be.visible');
        cy.get(this.elements.nextButtonLocator).should('be.enabled').click();
        checkout.checkThatPageWasOpened()
    }
}

export const orderDetails = new OrderDetails();
