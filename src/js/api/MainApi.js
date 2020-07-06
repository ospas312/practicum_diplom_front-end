//import { includes } from "core-js/fn/array";

export default class MainApi {
    constructor({ baseUrl, headers }) {
      this.baseUrl = baseUrl;
      this.headers = headers;
    }
    logout(){
        return fetch(`${this.baseUrl}logout`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this.headers,
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(res);
        });
    }
    signup(email, password, name){
        return fetch(`${this.baseUrl}signup`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                name
          })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(res);
        });
    }
    signin(email, password){
        return fetch(`${this.baseUrl}signin`, {
            method: 'POST',
            credentials: 'include',
            headers: this.headers,
            body: JSON.stringify({
                email,
                password
          })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(res);
        });
    }
    getUserData(){
        return fetch(`${this.baseUrl}users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: this.headers,
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(res);
        });
    }
    getArticles(){
        return fetch(`${this.baseUrl}articles`, {
            method: 'GET',
            credentials: 'include',
            headers: this.headers,
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(res);
        });
    }
    createArticle(keyword, title, text, date, source, link, image){
        return fetch(`${this.baseUrl}articles`, {
            method: 'POST',
            credentials: 'include',
            headers: this.headers,
            body: JSON.stringify({
                keyword,
                title,
                text,
                date,
                source,
                link,
                image
          })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(res);
        });
    }
    removeArticle(id){
        return fetch(`${this.baseUrl}articles/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this.headers,
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(res);
        });
    }
}