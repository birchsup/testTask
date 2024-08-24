class AvailableTicketsModal {
    elements={
        container:()=> cy.get('[class*="__selectOffer__"]'),
        sectorLocator:'[class*="__contentTop__"] > span:first-of-type',
        price:'[class*="__price__"]',
        seatingRow: '[class*="__seatingRow__"]',
        seatingColumn: '[class*="__seatingColumn__"]',
        offerOptions: '[class*="__offerItemBtn__"]',
        submitButton: '[class*="__contentBottomBtn__"]'

    }

    checkThatModalAppears(){
        this.elements.container().should('be.visible')
    }

    selectOffer(offerIndex){
        cy.get(this.elements.offerOptions).eq(offerIndex).should('be.visible')
        cy.get(this.elements.offerOptions).eq(offerIndex).click()
        cy.get(this.elements.submitButton).should('be.visible')
        cy.get(this.elements.submitButton).click()

    }

    getSelectedOfferInfo(offerIndex) {
        return this.elements.container().within(() => {
            // get sector
            cy.get(this.elements.sectorLocator)
                .invoke('text')
                .then(sectionValue => {
                    const seatInfo = {
                        section: sectionValue.trim()
                    };

                    // get row
                    cy.get(this.elements.seatingRow)
                        .invoke('text')
                        .then(rValue => {
                            seatInfo.r = rValue.trim();

                            // get seat
                            cy.get(this.elements.seatingColumn)
                                .invoke('text')
                                .then(spValue => {
                                    seatInfo.sp = spValue.trim();

                                    // get price
                                    cy.get(this.elements.price).filter(':visible').eq(offerIndex).should('be.visible')
                                        .invoke('text')
                                        .then(priceValue => {
                                            seatInfo.price = priceValue.trim();

                                            // save to alias
                                            cy.wrap(seatInfo).as('selectedOrderInfo');
                                            console.log("SEAT INFO: ", seatInfo);
                                        });
                                });
                        });
                });
        });
    }


}

export const availableTicketsModal = new AvailableTicketsModal();
