import { Notification } from "./notification";

const API = 'https://mixolydian-grape-october.glitch.me';

export const getComedians = async () => {
    try {
        const response = await fetch(`${API}/comedians`);
        if (!response.ok){
            throw new Error(`Сервер вернул ошибку: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Возникла проблема с fetch-запросом: ${error.message}`);
        Notification.getInstance().show('Возникла ошибка сервера. Попробуйте позже', false);
    }
};

export const getClient = async (ticket) => {
    try {
        const response = await fetch(`${API}/clients/${ticket}`);
        if (!response.ok){
            throw new Error(`Сервер вернул ошибку: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Возникла проблема с fetch-запросом: ${error.message}`);
        Notification.getInstance().show('Возникла ошибка сервера. Попробуйте позже', false);
    }
}

export const sendData = async (method, data, id) => {
    try {
        const response = await fetch(`${API}/clients${id ? `/${id}` : ''}`, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        if (!response.ok){
            throw new Error(`Сервер вернул ошибку: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error(`Возникла проблема с fetch-запросом: ${error.message}`);
        Notification.getInstance().show('Возникла ошибка сервера. Попробуйте позже', false);
        return false;
    }
}