import { cardHoverIn, cardHoverOut } from "./Animations.js";

const API_KEY = "eba8b9a7199efdcb0ca1f96879b83c44";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

let results, movies, movieImage, movieTitle, movieOverView, movieRelease, stars;

export async function getMovie(term) {
    let url = `https://api.themoviedb.org/3/${term}?api_key=${API_KEY}&language=en-US&include_adult=false`;
    let response = await fetch(url);
    if(response.ok) {
        let data = await response.json();
        results = data.results;
        display();
    }
}

export async function searchMovie(term) {
    if(term.trim() === "") return getMovie("movie/now_playing");

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${term}&include_adult=false`;
    let response = await fetch(url);
    if(response.ok) {
        let data = await response.json();
        results = data.results;
        display();
    }
}

export function display() {
    let html = "";
    results.forEach(value => {
        checkMovieData(value);

        html += `
        <div class="col-lg-4 col-md-6 col-sm-12 animate__animated">
            <div class="item overflow-hidden position-relative">
                <div class="cardImage">
                    <img src="${movieImage}" class="img-fluid">
                </div>
                <div class="overlay overflow-hidden">
                    <h1 class="animate__animated title">${value[movieTitle]}</h1>    
                    <p class="animate__animated desc">${movieOverView}</p>
                    <p class="animate__animated date"><span class="fst-normal">Release Date</span>: ${movieRelease}</p>
                    <h3 class="rate animate__animated vote">${stars}</h3>
                    <h3 class="rate animate__animated vote-average">${value.vote_average.toFixed(1)}</h3>
                </div>
            </div>
        </div>
        `;
    });

    $('#hero .row').html(html);
    $('#hero .row div').addClass("animate__fadeIn");
    $('#hero .item').mouseenter(cardHoverIn);
    $('#hero .item').mouseleave(cardHoverOut);
}

function checkMovieData(value) {

    if(!value.poster_path && !value.backdrop_path) movieImage = "assets/images/default-movie.jpg";
    else movieImage = value.poster_path ? IMG_PATH + value.poster_path : IMG_PATH + value.backdrop_path;

    movieTitle = value.title ? "title" : "name";

    movieOverView = value.overview.length > 300 ? value.overview.slice(0,300)+"..." : value.overview;

    movieRelease = value.release_date || value.first_air_date || "Release Date Unknown";

    stars = getStars(value.vote_average);
}

function getStars(vote) {
    let starHTML = "";
    let fullStars = Math.floor(vote / 2);
    let halfStar = vote % 2 >= 1 ? 1 : 0;

    for(let i=0;i<fullStars;i++) starHTML += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
    if(halfStar) starHTML += `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    let emptyStars = 5 - fullStars - halfStar;
    for(let i=0;i<emptyStars;i++) starHTML += `<i class="fa-regular fa-star text-muted fs-6"></i>`;
    
    return starHTML;
}
