import { validations } from "./Validation.js";
import { openNav } from "./Nav.js";
import { getMovie, searchMovie } from "./movies.js";
import { getMovieAttr, navGetSection, scroll, topZero } from "./scrollUtils.js";

$(document).ready(function(){
    validations();
    scroll();

    getMovie("movie/now_playing");

    $('.nav-menu').click(openNav);
    $('.menu a').click(getMovieAttr);
    $('.menu li a').click(navGetSection);

    $("#back-to-top").click(topZero);

    $('#search').on("input", e => {
        searchMovie(e.target.value);
    });

    $('.loading').fadeOut(2000);
});
