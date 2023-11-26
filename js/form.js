import Inputmask from 'inputmask';
import JustValidate from 'just-validate';
import { Notification } from './notification.js';

export const initForm = (bookingForm, bookingInputFullname, bookingInputPhone, bookingInputTicket) => {

    const validateForm = new JustValidate(bookingForm, {
        errorFieldCssClass: 'booking__input_invalid',
        successFieldCssClass: 'booking__input_valid'
    });

    new Inputmask('+7 (999)-999-99-99').mask(bookingInputPhone);
    new Inputmask('9999-9999').mask(bookingInputTicket);

    validateForm
        .addField(bookingInputFullname, [
            {
                rule: 'required',
                errorMessage: 'Заполните имя'
            },
            {
                rule: 'minLength',
                value: 5,
                errorMessage: 'Минимум 5 символов'
            }
        ])
        .addField(bookingInputPhone, [
            {
                rule: 'required',
                errorMessage: 'Заполните телефон'
            },
            {
                validator() {
                    const phone = bookingInputPhone.inputmask.unmaskedvalue();
                    return phone.length === 10;
                },
                errorMessage: 'Некорректный телефон'
            }
        ])
        .addField(bookingInputTicket, [
            {
                rule: 'required',
                errorMessage: 'Заполните номер билета'
            },
            {
                validator(){ 
                    const ticket = bookingInputTicket.inputmask.unmaskedvalue();
                    return ticket.length === 8;
                },
                errorMessage: 'Неверный номер билета'
            }
        ]).onFail((fields) => {
            let errorMessage = '';
            for (const key in fields) {
                if (!Object.hasOwnProperty.call(fields, key)) {
                    continue;
                }
                const element = fields[key];
                if (!element.isValid) {
                    errorMessage += `${element.errorMessage}, `;
                }
            }

            Notification.getInstance().show(errorMessage.slice(0, -2), false);
        });

        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = {booking: []};
            const times = new Set();
            new FormData(bookingForm).forEach((value, field) => {
                if (field === 'booking') {
                    const [ comedian, time ] = value.split(',');
                    if (comedian && time) {
                        data.booking.push({comedian, time});
                        times.add(time);
                    }    
                } else {
                    data[field] = value;
                }
    
                if ((times.size !== data.booking.length)) {
                    Notification.getInstance().show('Нельзя быть одновременно на двух выступлениях', false);
                }
            })
        });
}