export default class Popup {
    constructor(validation, popupNew, popupEdit, formSignin, formNew, popupLogin, header) {
      this.validation = validation;
      this.popupEdit = popupEdit;
      this.popupNew = popupNew;
      this.formSignin = formSignin;
      this.formNew = formNew;
      this.popupLogin = popupLogin;
      this.header = header;
    }
    setContent(){

    }
    clearContent(form){
        form.reset();
        form.querySelectorAll('.error').forEach((elem) => elem.textContent = '');
        form.lastElementChild.setAttribute('disabled', true);
    }
    open(event) {
      console.log(event.target.closest('.popup__signin'))
      if (event.target.closest('.menu__button') && event.target.textContent != 'Авторизоваться') {
        this.header.renderExit();
        return;
      }
      if (event.target.closest('.menu__button')) {
        this.clearContent(this.formSignin);
        this.validation.setEventListeners(this.popupEdit);
        this.popupEdit.classList.add('popup_is-opened');
        return;
      }
      if (event.target.closest('.popup__signin') && event.target.classList.contains('popup__button-text')) {
        this.clearContent(this.formNew);
        this.validation.setEventListeners(this.popupNew);
        event.target.closest('.popup').classList.remove('popup_is-opened');
        this.popupNew.classList.add('popup_is-opened');
        return;
      }
      if (event.target.closest('.popup__signup') && event.target.classList.contains('popup__button-text')) {
        this.clearContent(this.formSignin);
        this.validation.setEventListeners(this.popupEdit);
        event.target.closest('.popup').classList.remove('popup_is-opened');
        this.popupEdit.classList.add('popup_is-opened');
        return;
      }
      if (event.target.closest('.popup__signup-login') && event.target.classList.contains('popup__button-text')) {
        event.target.closest('.popup').classList.remove('popup_is-opened');
        this.popupEdit.classList.add('popup_is-opened');
        return;
      }
    }
    close(event) {
      if (event.type === 'submit' || event.key === 'Escape') {
        event.target.closest('.popup').classList.remove('popup_is-opened');
      }
      if (event.target.classList.contains('popup_is-opened') || event.target.classList.contains('popup__close')) {
        event.target.closest('.popup').classList.remove('popup_is-opened');
      }
    }
  }