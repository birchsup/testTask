import {calendar} from "../components/calendar.js";
import {offers} from "../components/offers.js";
import {hallMapPage} from "../pages/hallMap.js";
import {helpers} from "../helpers/helpers.js";
import {availableTicketsModal} from "../components/availableTicketsModal.js";
import {orderDetails} from "../pages/orderDetails.js";
import {checkout} from "../pages/checkout.js";
import {eventPage} from "../pages/event.js";


describe('Book a ticket', () => {
    beforeEach(() => {
        eventPage.openEvenPage()
    })
    it('should select event, book random event, and validate checkout page', () => {
        calendar.selectDate('2024-10', 10, "18:30")
        const sector = offers.proceedToSeatSelecting(0, "Bronze")

        //check for the hall map page
        hallMapPage.checkThatPageWasOpened()
        helpers.checkDateInSingleElement('selectedDateInfo', hallMapPage.elements.dateLocator);
        hallMapPage.checkThatSectorsActiveRegardingSelected(sector)

        // selecting random seat in the random sector
        hallMapPage.selectRandomSeat(sector)

        //offer confirmation
        availableTicketsModal.checkThatModalAppears();
        availableTicketsModal.getSelectedOfferInfo(0);
        availableTicketsModal.selectOffer(0);

        //booked seat validation
        hallMapPage.checkBookedSeat()

        //offer validation
        hallMapPage.checkBookedOffer()
        hallMapPage.clickOnTheNextButtons()
        orderDetails.fillForm('Armenia');
        orderDetails.clickNextButton();

        //validate checkout page
        checkout.checkOrderDetails()
        helpers.checkDateInSeparateElements('selectedDateInfo', checkout.elements.bookedOrderDate, checkout.elements.bookedOrderTime)
        checkout.checkTicketDeliveryMethod()
    })
})
