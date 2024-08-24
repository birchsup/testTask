import {format} from 'date-fns';

class Helpers {


    formatDate(dateObj) {
        const [year, month] = dateObj.selectedMonthYear.split('-');
        const date = new Date(year, month - 1, dateObj.selectedDay);

        const options = {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'};
        const formattedDateParts = date.toLocaleDateString('en-US', options).split(' ');

        let formattedDate = `${formattedDateParts[0]} ${formattedDateParts[2]} ${formattedDateParts[1]} ${formattedDateParts[3]}`;
        formattedDate = formattedDate.replace(/,/g, '');

        return `${dateObj.selectedTime} ${formattedDate}`;
    }


    formatDateForSeparateElements(dateObj) {
        const {selectedMonthYear, selectedDay} = dateObj;
        
        const date = new Date(`${selectedMonthYear}-${String(selectedDay).padStart(2, '0')}`);
        const formattedDate = `${format(date, 'EEE dd MMM')}`;
        return formattedDate;
    }

    checkDateInSingleElement(alias, elementLocator) {
        cy.get(`@${alias}`).then(dateObj => {
            const formattedDate = this.formatDate(dateObj);

            cy.get(elementLocator)
                .invoke('text')
                .then((text) => {
                    const cleanedText = text.replace(/\s+/g, ' ').trim();
                    expect(cleanedText).to.contain(formattedDate);
                });
        });
    }

    checkDateInSeparateElements(alias, dateLocator, timeLocator) {
        cy.get(`@${alias}`).then(dateObj => {
            const formattedDate = this.formatDateForSeparateElements(dateObj);
            cy.get(dateLocator).should('contain.text', formattedDate);
            cy.get(timeLocator).should('contain.text', dateObj.selectedTime);
        });
    }
}


export const helpers = new Helpers();
