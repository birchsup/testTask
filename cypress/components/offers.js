class Offers{
    elements={
        container:()=>cy.get('div.section.offers'),
        eventsLocator:'div.toggle-section',
        eventButton:'.btn-toggle',
        eventsContent: '.offers-section-content',
        sectorInfo:'.main-info'
    }

    proceedToSeatSelecting(eventIndex, sector){
        let selectedSector =''
        this.elements.container().should('be.visible');
        this.elements.container().find(this.elements.eventsLocator)
            .eq(eventIndex).should('be.visible')
            .within(() => {
                cy.get(this.elements.eventButton)
                .should('be.visible')
                .click();
    })
        cy.get(this.elements.eventsContent).eq(eventIndex).should('be.visible')
        .within(() => {
            this.clickButtonBySector(sector)

        })
        selectedSector = sector
        return selectedSector
    }


    clickButtonBySector(sector) {
        cy.get(this.elements.sectorInfo)
            .contains('.item-name.info-item span', sector)
            .parents('.main-info')
            .find('button.offer-select-seats')
            .should('be.visible')
            .click();
    }
}

export const offers = new Offers();
