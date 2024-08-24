import {orderDetails} from "./orderDetails.js";

class HallMapPage {
    elements = {
        mapContainer: () => cy.get('svg.hall-map-svg'),
        headerContainer: () => cy.get('.container-btn-back'),
        seatsContainer: () => cy.get('g[class= "seats"]'),
        zoomControlIn: '.hall-map-zoom-control-in',
        zoomControlOut: '.hall-map-zoom-control-out',
        dateLocator: '.btn-back-date.no-mobile',
        mapSectors: (sector) => (`g[z*="${sector}"]`),
        freeSeatsLocators: 'path[class="s p available"]',
        exactSeat: (r, sp) => (`[r="${r}"][sp="${sp}"]`),
        footerLocator: '[class="smart-footer"]',
        footerNextButton: '.smart-footer-next-button',
        footerOrderButton: '[class*="__content__"]',
        bookedOrderModal: '[class*=__wrapper__]',
        bookedOrderTitle: '[class*=__ticketName__]',
        bookedOrderPrice: '[class*=__ticketPrice__]',
        bookedOrderRow: () => cy.contains('span', 'Row:').next('span'),
        bookedOrderSeat: () => cy.contains('span', 'Seat:').next('span'),
        overlayLocator: '[class*="__overlay__"]'

    }


    checkThatPageWasOpened() {
        cy.url().should('include', '/hall-map');
        this.elements.mapContainer().should('be.visible')
        this.elements.headerContainer().should('be.visible')
        cy.get(this.elements.dateLocator).should('be.visible')
    }

    checkThatSectorsActiveRegardingSelected(sector) {
        const upperCaseSector = sector.toUpperCase();
        cy.get(this.elements.mapSectors(upperCaseSector)).should('be.visible')
        if (sector === 'Bronze') {
            cy.get(this.elements.mapSectors(upperCaseSector)).each($el => {
                cy.wrap($el).should('have.class', 'highlighted');
            });
            cy.get(this.elements.mapSectors(upperCaseSector)).then($bronzeZones => {
                cy.get('g.highlighted').should('have.length', $bronzeZones.length);
            });
        }
    }

    selectRandomSeat(sector) {
        const upperCaseSector = sector.toUpperCase();
        return cy.get(this.elements.mapSectors(upperCaseSector)).then($elements => {
            const count = $elements.length;
            const randomIndex = Math.floor(Math.random() * count);

            cy.wrap($elements[randomIndex]).click();
            cy.wait(1000);
            cy.wrap($elements[randomIndex]).click();

            return cy.wrap($elements[randomIndex]).within(() => {
                return this.elements.seatsContainer().should('exist')
                    .find(this.elements.freeSeatsLocators).should('be.visible')
                    .then($seats => {
                        const seatsCount = $seats.length;
                        const randomSeatIndex = Math.floor(Math.random() * seatsCount);
                        cy.wrap($seats[randomSeatIndex]).click();

                        // save alias
                        cy.wrap({
                            r: $seats[randomSeatIndex].getAttribute('r'),
                            sp: $seats[randomSeatIndex].getAttribute('sp')
                        }).as('selectedSeat');
                    });
            });
        });
    }

    checkBookedSeat() {
        cy.get('@selectedOrderInfo').then(selectedOffer => {
            cy.get(this.elements.exactSeat(selectedOffer.r, selectedOffer.sp)).should('be.visible')
            cy.get(this.elements.exactSeat(selectedOffer.r, selectedOffer.sp)).should('have.css', 'fill', 'rgb(55, 167, 248)');
        })
    }


    checkBookedOffer() {

        cy.get(this.elements.footerOrderButton).contains('span', 'Order details').should('be.visible');
        cy.get(this.elements.footerOrderButton).contains('span', 'Order details').click();
        cy.get(this.elements.bookedOrderModal).should('be.visible')

        cy.get('@selectedOrderInfo').then(selectedOffer => {
            cy.get(this.elements.bookedOrderTitle).should('be.visible').should('contain', selectedOffer.section);
            cy.get(this.elements.bookedOrderPrice).should('be.visible').should('contain', selectedOffer.price)
            this.elements.bookedOrderRow().should('be.visible').should('contain', selectedOffer.r)
            this.elements.bookedOrderSeat().should('be.visible').should('contain', selectedOffer.sp)
        })
    }


    clickOnTheNextButtons() {
        cy.get(this.elements.overlayLocator).click()
        cy.get(this.elements.overlayLocator).should('not.exist')
        cy.get(this.elements.footerLocator).should('be.visible')
        cy.get(this.elements.footerNextButton).should('be.visible').click();
        orderDetails.checkThaPageWasOpened()
    }

}

export const hallMapPage = new HallMapPage();
