import {dataGen} from "../helpers/dataGen.js";

class Checkout {
    elements = {
        container: () => cy.get('.checkout-block-wrapper'),
        dateLocator: '.show-date',
        seatingDetailsLocator: '.item-seating-details',
        ticketDeliveryLocator: '.ticket-delivery',
        ticketDeliveryContent: '.ticket-delivery__content',
        bookedOrderDate: '.show-date > span:not(.show-time):not(.calendar-icon-block)',
        bookedOrderTime: '.show-date > .show-time > span',
        bookedOrderSector: '[class="item-name-line"]',
        bookedOrderRow: () => cy.contains('span', 'Row:').parent('p'),
        bookedOrderSeat: () => cy.contains('span', 'Seat:').parent('p'),
        bookedOrderPrice: () => cy.contains('td', 'Tickets').next('td')
    }

    checkThatPageWasOpened() {
        cy.url().should('include', '/order/checkout');
        this.elements.container().should('be.visible');
    }

    checkOrderDetails() {
        cy.get('@selectedOrderInfo').then(selectedOffer => {
            cy.get(this.elements.bookedOrderSector).should('be.visible')
            cy.get(this.elements.bookedOrderSector).should('contain', selectedOffer.section);

            this.elements.bookedOrderRow().should('be.visible')
            this.elements.bookedOrderRow().should('contain', selectedOffer.r);

            this.elements.bookedOrderSeat().should('be.visible')
            this.elements.bookedOrderSeat().should('contain', selectedOffer.sp);

            this.elements.bookedOrderPrice().should('be.visible')
            this.elements.bookedOrderPrice().should('contain', selectedOffer.price);

        })
    }

    checkTicketDeliveryMethod() {
        cy.get(this.elements.ticketDeliveryLocator).should('be.visible')
        cy.get(this.elements.ticketDeliveryContent).should('be.visible')
        cy.get(this.elements.ticketDeliveryContent).should('contain', dataGen.randomEmail())
    }

}

export const checkout = new Checkout();
