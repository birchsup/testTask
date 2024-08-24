import {calendar} from "../components/calendar.js";

class EventPage {

    openEvenPage() {
        cy.visit('/');
        calendar.elements.container().should('be.visible');
    }
}

export const eventPage = new EventPage();
