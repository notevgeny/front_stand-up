export const displayClientInfo = (parent, data) => {
    parent.innerHTML += `
    <p class="booking__client-item">Имя: ${data.fullName}</p>
    <p class="booking__client-item">Телефон: ${data.phone}</p>
    <p class="booking__client-item">Номер билета: ${data.ticketNumber}</p>
    `;
};

export const displayBooking = (parent, clientData, comediansData) => {
    const bookingList = document.createElement('ul');
    bookingList.classList.add('booking__list');

    const bookingComedians = clientData.booking.map((bookingComedian) => {
        const comedian = comediansData.find(item => item.id === bookingComedian.comedian);
        const performance = comedian.performances.find(item => bookingComedian.time.trim() === item.time);
        return {
            comedian,
            performance
        }
    });

    bookingComedians.sort((a, b) => a.performance.time.localeCompare(b.performance.time));

    const comediansElements = bookingComedians.map(({ comedian, performance }) => {
        const comediansElement = document.createElement('li');
        comediansElement.classList.add('booking__item');
        comediansElement.innerHTML = `
            <h3>${comedian.comedian}</h3>
            <p>Время: ${performance.time}</p>
            <button 
                class="booking__hall" 
                type="button" 
                data-booking="${clientData.fullName} ${clientData.ticketNumber} ${comedian.comedian} ${performance.time} ${performance.hall}">
                ${[performance.hall]}
            </button>
        `;
        return comediansElement;
    });
    bookingList.append(...comediansElements);
    parent.append(bookingList);
};