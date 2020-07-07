export default function getArticles(mainApi) {
    const articleArr = [];
    mainApi.getArticles()
        .then((res) => {
            //articleArr = res.data.map(item => item.link);
            res.data.forEach((item) => {
                articleArr.push(item.link);
            });
        })
        .catch((err) => {
            err.text()
              .then(error => console.log(JSON.parse(error).message));
        });
    return articleArr;
}