import { createComedianBlock } from "./comedians";

export const initChangeSection = (bookingForm, 
    event,
    booking,
    eventButtonReserve,
    eventButtonEdit,
    bookingTitle,
    comedians,
    bookingComediansList) => {
        eventButtonReserve.style.transition = 'opacity 0.5s, visibility 0.5s';
        eventButtonEdit.style.transition = 'opacity 0.5s, visibility 0.5s';

        eventButtonReserve.classList.remove('event__button_hidden');
        eventButtonEdit.classList.remove('event__button_hidden');

        const changeSection = () => {
            event.classList.toggle('event__hidden');
            booking.classList.toggle('booking__hidden');

            if (!booking.classList.contains('booking__hidden')){
                const comedianBlock = createComedianBlock(comedians, bookingComediansList);
                bookingComediansList.append(comedianBlock);
            }
            
        }

        eventButtonReserve.addEventListener('click', () => { 
            changeSection();
            bookingForm.method = 'POST';
            bookingTitle.textContent = 'Забронируйте место в зале';
        })
        eventButtonEdit.addEventListener('click', () => { 
            changeSection();
            bookingForm.method = 'PATCH';
            bookingTitle.textContent = 'Редактирование брони';
        });

        return changeSection;
}



