import {
    getPopularMovies,
    getInterestingMovies,
    getPremierMovies,
    getPopularSerials,
    getMoviesByKeyword
} from './api/kinopoiskApi.js';
import { renderPoster } from './components/poster.js'
import { createMovieList } from './components/movie/movieList.js';
import { setupPagination } from './components/moviePagination.js';
import { openModal } from './components/modal.js'
import { initCategoriesInput } from './components/categoriesInput.js';



const popularMovieList = createMovieList('.pop-list');
const serialList = createMovieList('.pop-list');
const filteredMovieList = createMovieList('.movie-list');

setupPagination(popularMovieList, serialList);

// Главный старт.

getPremierMovies().then(data => {
    renderPoster(data.slice(4, 5), openModal);
}).catch(error => {
    console.error('Ошибка при загрузке популярных фильмов:', error);
});

getPopularMovies()
    .then(data => popularMovieList.initialize(data, 'mov', openModal))
    .catch(console.error);




const searchForm = document.querySelector('.header-input');
const searchInput = document.querySelector('.form-input');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const value = searchInput.value.trim();
    if (!value) return;

    try {
        const films = await getMoviesByKeyword(value);
        console.log(films)
        if (films && films.length > 0) {
            sessionStorage.setItem('searchResults', JSON.stringify(films));
            console.log(JSON.stringify(films))
        } else {
            sessionStorage.setItem('searchResults', JSON.stringify([]));
        }
        window.location.href = './search-results.html';
    } catch (e) {
        alert('Ошибка поиска!');
        console.error(e);
    }
});


document.querySelector('.categories-films').addEventListener('click', () => {
    getPopularMovies()
        .then(data => popularMovieList.initialize(data, 'mov', openModal));
});

document.querySelector('.categories-serials').addEventListener('click', () => {
    getPopularSerials()
        .then(data => serialList.initialize(data, 'ser', openModal));
});

document.querySelector('.categories-favourite').addEventListener('click', () => {
    getInterestingMovies()
        .then(data => popularMovieList.initialize(data, 'mov', openModal));
});

document.querySelector('#searchButton').addEventListener('click', () => {
    initCategoriesInput((movies) => {
        filteredMovieList.initialize(movies, 'mov', openModal);
    }, openModal);
});


