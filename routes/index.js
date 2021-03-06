var express = require('express');
var router = express.Router();
var request = require('request');

var config = {
    baseUrl: 'https://api.themoviedb.org/3/',
    encoding: 'language=en-US&page=1&include_adult=false',
    imageBase: 'https://image.tmdb.org/t/p/w370_and_h556_bestv2',
    imageFUll: 'https://image.tmdb.org/t/p/w800',
    append: `append_to_response=credits,release_dates`,
    apiKey: 'api_key=1f809315a3a8c0a1456dd83615b4d783',
    movieUrl: `https://api.themoviedb.org/3/movie/now_playing?api_key=1f809315a3a8c0a1456dd83615b4d783&page=1`
}

router.get('/search', (req, res, next) => {
    res.render('search', {});
    // res.send("haha");
});

router.post('/searchMovie', (req, res, next) => {
    var searchString = encodeURI(req.body.movieSearch);
    var queryUrl = config.baseUrl + 'search/movie?' + config.apiKey + '&query=' + searchString;
    request.get(queryUrl, (error, response, searchData) => {
        searchData = JSON.parse(searchData);
        console.log(searchData);
        res.render('index', {movies: searchData.results})
    })
})

/* GET home page. */
router.get('/', function(req, res, next) {
    request.get(config.movieUrl, (error, response, data) => {
        console.log('\n$$$$$$$$$$$$$$$$$$$$$$$$$$$\n');
        data = JSON.parse(data);
        console.log(data.results);
        res.render('index', { movies: data.results });
    });
});

module.exports = router;
