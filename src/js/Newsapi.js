export class Newsapi {
    constructor(validation, popupSearch, resetForm, formSearch) {
      this.validation = validation;
      this.popupSearch = popupSearch;
      this.resetForm = resetForm;
      this.formSearch = formSearch;
    }
  
    search(event) {
      event.preventDefault();
      console.log(event.target.search.value);
      this.resetForm(event.target);
      this.validation.setEventListeners(this.popupSearch);
      console.log('дошло2');
      return;
      
      /*if (event.target.closest('.user-info__button_edit')) {
        this.resetForm(this.formEdit);
        this.userInfo.setUserInfo();
        this.validation.setEventListeners(this.popupEdit);
        this.popupEdit.classList.add('popup_is-opened');
        return;
      }
      if (event.target.classList.contains('place-card__image')) {
        const image = event.target.style.backgroundImage.slice(5, -2);
        this.popupPhoto.querySelector('.popup__image').setAttribute('src', image);
        this.popupPhoto.classList.add('popup_is-opened');
        return;
      }*/
    }
    close(event) {
      if (event.type === 'submit' || event.key === 'Escape') {
        console.log('1');
        event.target.closest('.popup').classList.remove('popup_is-opened');
      }
      if (event.target.classList.contains('popup_is-opened') || event.target.classList.contains('popup__close')) {
        event.target.closest('.popup').classList.remove('popup_is-opened');
      }
    }
  }