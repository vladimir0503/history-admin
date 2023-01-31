import { API } from "./api";

const botToken = '5796180099:AAEK7ED6DP735MvASQFJUjXb_VAUi0zfUvM';
const chatId = -862534173;
const telegramApi = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&parse_mode=html&text=`;

export const remindAuthData = async () => {
    const { login, password } = await API.getData('admin');
    const message = `<b>Данные для входа</b>%0A Логин: ${login}%0A Пароль: ${password}%0A `;
    const res = await fetch(`${telegramApi}${message}`);
    return res;
};