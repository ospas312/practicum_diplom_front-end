export class FormValidator {
  constructor(errorMessages) {
    this.errorMessages = errorMessages;
  }
  checkInputValidity(input, error) {
    if (input.id == document.querySelector('.search__input_type_search').id) { 
      if (input.value.length === 0) {
        error.textContent = this.errorMessages.searchError;
        return;
      }
      if (input.value.length < 2 || input.value.length > 30) {
        error.textContent = this.errorMessages.lenghtError;
        return;
      }
      error.textContent = this.errorMessages.noError;
    }
    if ((input.id == document.querySelector('.popup__input_type_password').id) || (input.id == document.querySelector('.popup__input_type_pass').id)) {
      if (input.value.length === 0) {
        error.textContent = this.errorMessages.valueError;
        return;
      }
      if (input.value.length < 8 || input.validity.typeMismatch) {
        error.textContent = this.errorMessages.passError;
        return;
      }
      error.textContent = this.errorMessages.noError;
    }
    if ((input.id == document.querySelector('.popup__input_type_email').id) || (input.id == document.querySelector('.popup__input_type_email-signin').id)) {
      if (input.value.length === 0) {
        error.textContent = this.errorMessages.valueError;
        return;
      }
      if (input.value.length < 2 || input.validity.typeMismatch) {
        error.textContent = this.errorMessages.emailError;
        return;
      }
      error.textContent = this.errorMessages.noError;
    }
    if ((input.id !== document.querySelector('.popup__input_type_email').id) && (input.id !== document.querySelector('.popup__input_type_password').id)) { 
      if (input.value.length === 0) {
        error.textContent = this.errorMessages.valueError;
        return;
      }
      if (input.value.length < 2 || input.value.length > 30) {
        error.textContent = this.errorMessages.lenghtError;
        return;
      }
      error.textContent = this.errorMessages.noError;
    }
  }
  setSubmitButtonState(form, button) {
    button.disabled = !form.checkValidity();
  }
  setEventListeners(popup) {
    this.form = popup.querySelector('form');
    this.button = this.form.querySelector('button');

    this.form.addEventListener('input', (event) => {
      this.checkInputValidity(event.target, event.target.nextElementSibling);
      this.setSubmitButtonState(this.form, this.button);
    });
  }
}; 