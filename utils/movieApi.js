//declare vars:
//getting our movie poster from tmdb if the quality is as good might use other site:
const axios = require('axios').default; 

var posters = 'https://image.tmdb.org/t/p/w500';   
const MOVIE_API = "https://api.themoviedb.org/3/"
const path = '/search/movie';


function getActionData(type) {
    var apiUrl ='https://api.themoviedb.org/3/discover/movie' + '?api_key=' + process.env.apiKEY + '&with_genres=28';
    return axios(apiUrl);
}

function getComedyData(type) {
    var apiUrl ='https://api.themoviedb.org/3/discover/movie' + '?api_key=' + process.env.apiKEY + '&with_genres=35';
    return axios(apiUrl);
}

function getRomanceData(type) {
    var apiUrl ='https://api.themoviedb.org/3/discover/movie' + '?api_key=' + process.env.apiKEY + '&with_genres=10749';
    return axios(apiUrl);
}

function getContentData(type, id) {
    var apiUrl = MOVIE_API + type + '/' + id + '?api_key=' + process.env.apiKEY + '&language=en-US';
    // console.log(apiUrl);
    return axios(apiUrl);
}

function getPopData(type) {
    var apiUrl = MOVIE_API + type + '/popular?api_key=' + process.env.apiKEY + '&language=en-US';
    return axios(apiUrl);
}

function getTopData(type) {
    var apiUrl = MOVIE_API + type + '/top_rated?api_key=' + process.env.apiKEY + '&language=en-US';
    return axios(apiUrl);
}

function createContent(data,) {
    let contentObj = {
        id: ((data.id) ? data.id : null),
        // video: ((moviesData.key)),
        
        type: ((data.title) ? 'movie' : 'tv'),
        title: ((data.title) ? data.title : data.name),
        release: ((data.release_date) ? data.release_date : data.first_air_date),
        popularity: ((data.vote_average) ? data.vote_average : 0),
        overview: ((data.overview) ? data.overview : 'There is no description for this title.'),
        poster: ((data.poster_path) ? (posters + data.poster_path) : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'),
        backdrop: ((data.backdrop_path) ? posters + data.backdrop_path : '')
        
    }
    // formats the release date or sets to 00/00/0000
    if (contentObj.release) {
        let dateString = contentObj.release.split('-');
        contentObj.release = dateString[1] + '/' + dateString[2] + '/' + dateString[0];
    } else {
        contentObj.release = '00/00/0000';
    }
    // formats the genres to a simple array or sets to None
    if (data.genres) {
        let genres = [];
        data.genres.forEach(function (genre) {
            genres.push(genre.name);
        });
        contentObj.genres = genres;
    } else {
        data.genres = ['None'];
    }
    return contentObj;
}


function searchContent(query) {
    var apiUrl = `https://api.themoviedb.org/3${path}?api_key=${process.env.apiKEY}&query=${query}`;
    // console.log(apiUrl);
    return axios(apiUrl)
}

function youtube(id) {
    var apiUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.apiKEY}`;
    console.log(apiUrl);
    return axios(apiUrl);
     
}
    
//export time 
module.exports = { searchContent, getContentData, getTopData, getPopData, createContent,getActionData, getComedyData, getRomanceData, youtube  }