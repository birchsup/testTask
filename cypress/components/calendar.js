class Calendar {
    elements = {
        container: () => cy.get('.ticket-offer__calendar'),
        dayLocator: ('.event-calendar-day-number'),
        monthSelectorLocator: (month) => (`li[data-event-calendar-month-link="${month}"]`),
        monthTable: (month) => (`table[data-event-calendar-table="${month}"]`),
        timeOption: (time) => ('.flex-show-calendar-container .show-selection-time', time)
    }

    selectDate(month, day, time) {
        this.elements.container().find(this.elements.monthSelectorLocator(month)).click({force: true});
        cy.get(this.elements.monthTable(month)).should('be.visible');

        cy.get(this.elements.monthTable(month))
            .should('be.visible')
            .within(() => {
                // day inside table
                cy.get(this.elements.dayLocator)
                    .contains(day)
                    .click({force: true});
                cy.get(this.elements.dayLocator).contains(day).parent()
                    .should('have.css', 'background-color', 'rgb(104, 33, 130)');
                cy.contains(this.elements.timeOption(time)).should('be.visible');
                cy.contains(this.elements.timeOption(time)).click();
            });

        //create onject
        const selectedDate = {
            selectedMonthYear: month,
            selectedDay: day,
            selectedTime: time
        };

        cy.wrap(selectedDate).as('selectedDateInfo');
    }
}

export const calendar = new Calendar();
