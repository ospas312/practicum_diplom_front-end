import MainApi from "./api/MainApi.js";
import Popup from "./components/Popup.js";
import {UserInfo} from "./UserInfo.js";
import {FormValidator} from "./FormValidator.js";
import {serverUrl} from "./config.js";
import NewsApi from "./api/NewsApi.js";
import Header from "./components/Header.js";
import NewsCardList from "./components/NewsCardList.js";
import {
  ERROR_MESSAGES,
  isLogged,
  apiKey
} from './constants/constants.js';

const cardContainer = document.querySelector('.places-list');
const formSignin = document.forms.signin; //popup__form-signin
const formNew = document.forms.signup; //popup__form-signup
const formSearch = document.forms.search; //search__form
const popupNew = document.querySelector('.popup__signup');
const popupEdit = document.querySelector('.popup__signin');
const popupSearch = document.querySelector('.search');
const popupLogin = document.querySelector('.popup__signup-login');

const articles = document.querySelectorAll('.menu__icon-articles');
const buttons = document.querySelectorAll('.menu__button');

const mainApi = new MainApi({
  baseUrl: 'https://api.perpetuum.space/',
  headers: {
    'Content-Type': 'application/json',
  }
});

const newsApi = new NewsApi(apiKey);
const header = new Header(mainApi, articles, buttons, isLogged);
header.render()
  .catch((err) => {
    err.text()
        .then((error) => {
          console.log(JSON.parse(error).message)
      });
  })

const newsCardList = new NewsCardList(mainApi, isLogged);
const formValidator = new FormValidator(ERROR_MESSAGES);
const popup = new Popup(formValidator, popupNew, popupEdit,
  formSignin, formNew, popupLogin, header);

formValidator.setEventListeners(popupSearch);

formSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('.preloader').classList.add('section-vision');
  const item = (event.target.search.value);
  formValidator.setEventListeners(popupSearch);
  popup.clearContent(event.target);//resetForm(event.target);
  newsApi.getNews(item)
    .then((res) =>{
      console.log(res);
      if(res.articles.length != 0){
        document.querySelector('.cards').classList.add('section-vision');
        document.querySelector('.not-found').classList.remove('section-vision');
        newsCardList.addCardArr(res.articles, item);
        document.querySelector('.preloader').classList.remove('section-vision');
      } else {
        document.querySelector('.cards').classList.remove('section-vision');
        document.querySelector('.not-found').classList.add('section-vision');
        document.querySelector('.preloader').classList.remove('section-vision');
      }
    })
    .catch((err) => {
      err.text()
        .then((error) => {
          console.log(JSON.parse(error).message)
      });
    });
});

formNew.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = (event.target.email.value);
  const password = (event.target.password.value);
  const name = (event.target.name.value);
  mainApi.signup(email, password, name)
    .then((res) =>{
      console.log('formNew',res);
      //if (res.ok) {
        popup.close(event);
        popupLogin.classList.add('popup_is-opened');
      //}
      //return Promise.reject(res);
  })
  .catch((err) => {
    err.text()
      .then((error) => {
        event.target.querySelector('.error-form').textContent = JSON.parse(error).message;
        console.log(JSON.parse(error).message)
      });
  });
});

formSignin.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = (event.target.email.value);
  const password = (event.target.password.value);
  mainApi.signin(email, password)
    .then((res) =>{
      console.log(res);
      header.render();
      popup.close(event);
    })
  .catch((err) => {
      err.text()
      .then((error) => {
        event.target.querySelector('.error-form').textContent = JSON.parse(error).message;
        console.log(JSON.parse(error).message)
      });
  });
});

cardContainer.addEventListener('click', (event) => {
  if (event.target.closest('.place-card__icons')){
    if (isLogged.userAuth == true){
      event.target.closest('.place-card__icons').firstElementChild.style.display = 'none';
      newsCardList.addCard(event.target.closest('.place-card'))
      .then((res) => {
          event.target.classList.add('place-card__icon-focus');
      })
      .catch((err) => {
        err.text()
          .then(error => console.log(JSON.parse(error).message));  
      })
    } else{
      event.target.closest('.place-card__icons').firstElementChild.style.display = 'flex';
    }
  } 
})

document.querySelector('.cards__button').addEventListener('click', () => newsCardList.showMore());
document.addEventListener('click', popup.close);
document.addEventListener('click', (event) => popup.open(event));