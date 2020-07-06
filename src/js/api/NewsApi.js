export default class NewsApi {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.key = '0455a0ba8794482a80f58b4757c2ee79';
      this.searchDate();
    }
    searchDate(){
      this.toDay = new Date();
      this.sevenDay = new Date(this.toDay.getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString();
      this.toDay = this.toDay.toISOString();
    }
    getNews(query){
      return fetch(`http://newsapi.org/v2/everything?q=${query}&from=${this.sevenDay}&from=${this.toDay}&pageSize=100&apiKey=${this.key}`, {
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      });
    }
}    