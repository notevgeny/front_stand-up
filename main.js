import './style.css';
import TomSelect from 'tom-select';


const MAX_COMEDIANS = 6;

const bookingComediansList = document.querySelector('.booking__comedians-list');


const createComedianBlock = (comedians) => {
    const bookingComedian = document.createElement('li');
    bookingComedian.classList.add('booking__comedian');

    const bookingSelectComedian = document.createElement('select');
    bookingSelectComedian.classList.add(
        "booking__select",
        "booking__select_comedian"
    );

    const bookingSelectTime = document.createElement('select');
    bookingSelectTime.classList.add(
        "booking__select",
        "booking__select_time"
    );

    const inputHidden = document.createElement('input');
    inputHidden.type = 'hidden';
    inputHidden.name = 'booking';

    const bookingHall = document.createElement('button');
    bookingHall.classList.add('booking__hall');

    bookingComedian.append(bookingSelectComedian, bookingSelectTime, inputHidden);

    const bookingTomSelectComedian = new TomSelect(bookingSelectComedian, {
        hideSelected: true,
        placeholder: 'Выбрать комика',
        options: comedians.map(item => ({
            value: item.id,
            text: item.comedian
        }))
    });
    const bookingTomSelectTime = new TomSelect(bookingSelectTime, {
            hideSelected: false,
            placeholder: 'Время',
    });

    bookingTomSelectTime.disable();

    bookingTomSelectComedian.on('change', (id) => {
        bookingTomSelectTime.enable();
        bookingTomSelectComedian.blur();
        const { performances } = comedians.find(item => item.id === id);
        bookingTomSelectTime.clear();
        bookingTomSelectTime.clearOptions();
        bookingTomSelectTime.addOptions(performances.map(item => ({
            value: item.time,
            text: item.time
        })))

        bookingHall.remove();
    });

    bookingTomSelectTime.on('change', (time) => {
        if (!time) {
            return;
        }
        const idComedian = bookingTomSelectComedian.getValue();
        const { performances } = comedians.find(item => item.id === idComedian);
        const { hall } = performances.find(item => item.time === time);
        inputHidden.value = `${idComedian}, ${time}`;
        bookingTomSelectTime.blur();
        bookingHall.textContent = hall;
        bookingComedian.append(bookingHall);
    });

    const createNextBookingComedians = () => {
        if (bookingComediansList.children.length < MAX_COMEDIANS) {
            const nextComediansBlock = createComedianBlock(comedians);
            bookingComediansList.append(nextComediansBlock);
        }
        bookingTomSelectTime.off('change', createNextBookingComedians);
    }

    bookingTomSelectTime.on('change', createNextBookingComedians)

    return bookingComedian;
}


const getComedians = async () => {
    const response = await fetch('http://localhost:8080/comedians');
    return response.json();
}


const init = async () => {

    const amountComedians = document.querySelector('.event__info-item_comedians .event__info-number');

    const comedians = await getComedians();
    amountComedians.textContent = comedians.length;

    const comedianBlock = createComedianBlock(comedians);
    bookingComediansList.append(comedianBlock);
}

init();