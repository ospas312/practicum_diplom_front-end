export default class NewsCardList{
    constructor(mainApi, isLogged){
        this.arr = [];
        this.searchText = '';
        this.startIndex = 0;
        this.cardOnPage = 3;
        this.mainApi= mainApi
        this.isLogged = isLogged
    }
    addCardArr(items, searchText){
        console.log(items) ///не забыть убрать
        this.arr  = items;
        this.searchText = searchText;
        if(items.length > 3){
            document.querySelector('.cards__button').style.display = 'block';
        } else {
            document.querySelector('.cards__button').style.display = 'none';
        }
        this.startIndex = 0;
        this.clearResults();
        this.renderResults();
    }
    showMore(){
        this.arr.splice(0, 3);
        if(this.arr.length === 0) {
            document.querySelector('.cards__button').style.display = 'none';
            return;
        }
        if(this.arr.length <= 3) {
            document.querySelector('.cards__button').style.display = 'none';
            this.renderResults();
            return;
        }
        if(this.arr.length >= 4){
            document.querySelector('.cards__button').style.display = 'block';
            this.renderResults();
            return;
        }   
    }
    clearResults(){
        const placesList = document.querySelector('.places-list');
        while (placesList.firstChild) {
            placesList.removeChild(placesList.firstChild);
        };
    }
    renderResults(){
            let items = this.arr;
            let search = this.searchText
            const cardTmpl = document.querySelector('#tmpl');
            const placesList = document.querySelector('.places-list');
            for (let item in items.slice(0, 3)) { //.slice(0, 3)
                const card = document.importNode(cardTmpl.content, true);
                card.querySelector('.place-card__link').setAttribute('href', items[item].url);
                card.querySelector('.place-card__date').textContent = this.renderDate(items[item].publishedAt);
                card.querySelector('.place-card__title').textContent = items[item].title;
                card.querySelector('.place-card__subtitle').textContent = items[item].description;
                card.querySelector('.place-card__source').textContent = items[item].source.name;
                card.querySelector('.place-card__image-key').textContent = search;
                if(!items[item].urlToImage){
                    card.querySelector('.place-card__image').style.backgroundImage = "url('https://amd-agro.ru/media/catalog/product/cache/1/image/d3c8bcb7854d60ce1b923908353486f1/placeholder/default/placeholder-image.jpg')";
                } else{
                    card.querySelector('.place-card__image').style.backgroundImage = `url(${items[item].urlToImage})`;
                }
                placesList.appendChild(card);
            } 
            return;
    }
    renderDate(date){
        const formatter = new Intl.DateTimeFormat('ru', {
            day: 'numeric',
            month: 'long',
            year: "numeric",
        });
        return formatter.format(new Date(date));
    }
    addCard(card){
        const keyword = card.querySelector('.place-card__image-key').textContent;
        const title = card.querySelector('.place-card__title').textContent;
        const text = card.querySelector('.place-card__subtitle').textContent;
        const date = card.querySelector('.place-card__date').textContent;
        const source = card.querySelector('.place-card__source').textContent;
        const link = card.querySelector('.place-card__link').getAttribute('href');
        const image = card.querySelector('.place-card__image').style.backgroundImage.slice(5, -2);
        return this.mainApi.createArticle(keyword, title, text, date, source, link, image);
    }
    renderArticles(items){
        const cardTmpl = document.querySelector('#tmpl');
        const placesList = document.querySelector('.places-list');
        for (let item in items) {
            const card = document.importNode(cardTmpl.content, true);
            card.querySelector('.place-card__image-key').style.display = 'block'
            card.querySelector('.place-card__image').style.justifyContent = 'space-between';
            card.querySelector('.place-card__link').setAttribute('href', items[item].link);
            card.querySelector('.place-card__image').style.backgroundImage = `url(${items[item].image})`;
            card.querySelector('.place-card__date').textContent = items[item].date
            card.querySelector('.place-card__title').textContent = items[item].title;
            card.querySelector('.place-card__subtitle').textContent = items[item].text;
            card.querySelector('.place-card__source').textContent = items[item].source;
            card.querySelector('.place-card__image-key').textContent = items[item].keyword;
            card.querySelector('.place-card').id = items[item]._id;
            placesList.appendChild(card);
        } 
        return;
    }
    renderSave(){
        return this.mainApi.getArticles()
            .then((res) => {
                this.clearResults();
                if(res.data.length != 0){
                    let uniq = Array.from(new Set(res.data.map(item => item.keyword)));
                    document.querySelector('.history__title').textContent = `${this.isLogged.userName}, у вас ${res.data.length} сохранённых статей`;
                    document.querySelector('.history__text-bold').textContent = uniq.join(', ');
                    this.renderArticles(res.data);
                    document.querySelector('.cards').classList.add('section-vision');
                } else {
                    document.querySelector('.history__title').textContent = `${this.isLogged.userName}, у вас нет сохранённых статей`;
                    document.querySelector('.history__text-bold').textContent = '';
                    document.querySelector('.cards').classList.remove('section-vision');
                }
            })
            .catch((err) => {
                err.text()
                    .then(error => console.log(JSON.parse(error).message));
            })
    }
    renderLoader(){

    }
    renderError(){

    }
}