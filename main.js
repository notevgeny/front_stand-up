import './style.css';

import { getComedians } from './js/api.js';
import { initForm } from './js/form.js';
import { createComedianBlock } from './js/comedians.js';

const init = async () => {

    const amountComedians = document.querySelector('.event__info-item_comedians .event__info-number');
    const bookingForm = document.querySelector('.booking__form');
    const bookingComediansList = document.querySelector('.booking__comedians-list');
    const bookingInputFullname = document.querySelector('.booking__input_fullname');
    const bookingInputPhone = document.querySelector('.booking__input_phone');
    const bookingInputTicket = document.querySelector('.booking__input_ticket');

    initForm(bookingForm, bookingInputFullname, bookingInputPhone, bookingInputTicket);

    const comedians = await getComedians();

    if (comedians) {
        amountComedians.textContent = comedians.length;
        const comedianBlock = createComedianBlock(comedians, bookingComediansList);
        bookingComediansList.append(comedianBlock);
    }
}

init();