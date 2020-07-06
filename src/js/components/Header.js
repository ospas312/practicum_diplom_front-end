export default class Header {
    constructor(mainApi, articles, buttons, isLogged){
        this.mainApi = mainApi;
        this.articles = articles;
        this.buttons = buttons;
        this.isLogged = isLogged;
    }
    render(){ 
        return this.mainApi.getUserData()
            .then((user) => {
                this.isLogged.userName = user.data.name;
                this.isLogged.userAuth = true;
                this.articles.forEach((elem) => elem.style.display = 'block');
                this.buttons.forEach((elem) => elem.lastChild.style.display = 'block');
                this.buttons.forEach((elem) => elem.firstChild.textContent = `${this.isLogged.userName}`); 
            })
            .catch((err) => {
                //err.text()
                    //.then(error => console.log(JSON.parse(error).message));
                this.isLogged.userName = '';
                this.isLogged.userAuth = false;
                this.articles.forEach((elem) => elem.style.display = 'none');
                this.buttons.forEach((elem) => elem.lastChild.style.display = 'none');
                this.buttons.forEach((elem) => elem.firstChild.textContent = 'Авторизоваться');
                return Promise.reject(err);
            });
    }
    renderExit(){
        return this.mainApi.logout()
            .then((res) => {
                this.render();
            })
            .catch((err) => {
                err.text()
                .then(error => console.log(JSON.parse(error).message));
            });
    }

}