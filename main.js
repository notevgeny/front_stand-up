import './style.css';

import { getComedians } from './js/api.js';
import { initForm } from './js/form.js';
import { createComedianBlock } from './js/comedians.js';
import { initChangeSection } from './js/changeSection.js';
import { initQrcodePage } from './js/qrcodePage.js';

const init = async () => {

    if (window.location.pathname.endsWith('qrcode.html')) {
        initQrcodePage();
        return;
    }

    const amountComedians = document.querySelector('.event__info-item_comedians .event__info-number');
    const bookingForm = document.querySelector('.booking__form');
    const bookingComediansList = document.querySelector('.booking__comedians-list');
    const bookingInputFullname = document.querySelector('.booking__input_fullname');
    const bookingInputPhone = document.querySelector('.booking__input_phone');
    const bookingInputTicket = document.querySelector('.booking__input_ticket');

    const event = document.querySelector('.event');
    const booking = document.querySelector('.booking');
    const eventButtonReserve = document.querySelector('.event__button_reserve');
    const eventButtonEdit = document.querySelector('.event__button_edit');
    const bookingTitle = document.querySelector('.booking__title');

    const comedians = await getComedians();

    if (comedians) {
        amountComedians.textContent = comedians.length;
        

        const changeSection = initChangeSection(
            bookingForm, 
            event, 
            booking, 
            eventButtonReserve, 
            eventButtonEdit, 
            bookingTitle, 
            comedians,
            bookingComediansList
        );

        initForm(
            bookingForm, 
            bookingInputFullname, 
            bookingInputPhone, 
            bookingInputTicket, 
            changeSection, 
            bookingComediansList,
        );
    }
}

init();