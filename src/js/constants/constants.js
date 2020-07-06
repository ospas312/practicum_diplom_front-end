const ERROR_MESSAGES = {
    noError: '',
    urlError: 'Здесь должна быть ссылка',
    emailError: 'Здесь должен быть email',
    valueError: 'Это обязательное поле',
    passError: 'Должно быть от 8 до 30 символов',
    lenghtError: 'Должно быть от 2 до 30 символов',
    searchError: 'Нужно ввести ключевое слово',
};
let isLogged = {
    userName: '',
    userAuth: ''
}
const apiKey = '0455a0ba8794482a80f58b4757c2ee79';

const articles = document.querySelectorAll('.menu__icon-articles');
const buttons = document.querySelectorAll('.menu__button');


export {
    ERROR_MESSAGES,
    isLogged,
    apiKey,
    articles,
    buttons
}