import "../css/articles.css";
//import "./script.js";
import MainApi from "./api/MainApi.js";
import NewsCardList from "./components/NewsCardList.js";
import Header from "./components/Header.js";
import {
    ERROR_MESSAGES,
    isLogged,
    apiKey,
    articles,
    buttons
  } from './constants/constants.js';


const mainApi = new MainApi({
    baseUrl: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    }
});

const newsCardList = new NewsCardList(mainApi, isLogged);
const header = new Header(mainApi, articles, buttons, isLogged);

header.render()
    .catch((err) =>{
        window.location.href = '/';
    });


newsCardList.renderSave();

document.addEventListener('click', (event) => {
    if(event.target.closest('.place-card__icon-del')){
        const id = event.target.parentElement.parentElement.parentElement.id;
        mainApi.removeArticle(id)
            .then((res) =>{
                event.target.parentElement.parentElement.parentElement.remove();
                newsCardList.renderSave();
            }) 
            .catch((err) => {
                err.text()
                .then(error => console.log(JSON.parse(error).message));
            });
    }
    if(event.target.closest('.menu__button')){
        header.renderExit()
            .then((res) => {
                window.location.href = '/';
            })
            .catch((err) => {
                err.text()
                .then(error => console.log(JSON.parse(error).message));
            });
    }        
}); 