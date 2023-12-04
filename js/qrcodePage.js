import { Notification } from "./notification";
import { getClient, getComedians } from "./api";
import { displayBooking, displayClientInfo } from "./display";
import { showQrcodeController } from "./showQrcodeController";

const getTicketNumber = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('t');
}

export const initQrcodePage = async () => {
    const clientInfo = document.querySelector('.booking__client-info');
    const bookingPerformance = document.querySelector('.booking__performance');

    const ticketNumber = getTicketNumber();

    if (ticketNumber) {
        const clientData = await getClient(ticketNumber);
        displayClientInfo(clientInfo, clientData);
        const comediansData = await getComedians(ticketNumber);
        displayBooking(bookingPerformance, clientData, comediansData);

        showQrcodeController(bookingPerformance);

    } else {
        Notification.getInstance().show('Произошла ошибка, проверьте ссылку!', false);
    }
}