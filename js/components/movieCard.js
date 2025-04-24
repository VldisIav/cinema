import { getRatingClass } from './helpers.js'
import { openModal } from './modal.js';


let allMovies = []; // Массив для хранения всех фильмов
let visibleMovies = []; // Массив для отображаемых фильмов
const moviesPerPage = 8;
let currentMoviePage = 1;

let allSerials = []; // Массив для хранения всех фильмов
let visibleSerials = []; // Массив для отображаемых фильмов
const serialsPerPage = 8;
let currentSerialPage = 1;

let watchAllBtn = document.querySelector('.watch-all')

console.log(watchAllBtn)


export function renderMovieList(movies, openModal) {
    allMovies = movies; // Сохраняем все фильмы
    currentMoviePage = 1; // Сбрасываем страницу при новом запросе

    // console.log(allMovies)
    visibleMovies = allMovies.slice(0, moviesPerPage); // Берем первые 8 фильмов
    console.log(visibleMovies)
    renderMovies(visibleMovies, openModal);
    updateWatchAllMovies();
}


let allMoviesFilters = []; // Массив для хранения всех фильмов
let visibleMoviesFilters = []; // Массив для отображаемых фильмов
const moviesPerPageFilters = 8;
let currentMoviePageFilters = 1;

export function renderMovieListByFilters(movies, openModal) {
    allMoviesFilters = movies; // Сохраняем все фильмы
    currentMoviePageFilters = 1; // Сбрасываем страницу при новом запросе

    // console.log(allMovies)
    visibleMoviesFilters = allMoviesFilters.slice(0, moviesPerPageFilters); // Берем первые 8 фильмов
    console.log(visibleMoviesFilters)
    renderMoviesByFilters(visibleMoviesFilters, openModal);
    updateWatchAllMovies();
}

export function renderSerialsList(serials, openModal) {
    allSerials = serials; // Сохраняем все фильмы
    currentSerialPage = 1; // Сбрасываем страницу при новом запросе


    visibleSerials = allSerials.slice(0, serialsPerPage); // Берем первые 8 фильмов
    console.log(visibleSerials)
    renderSerials(visibleSerials, openModal);
    updateWatchAllSerials();
}


function renderMovies(movies, onCardClick) {
    const popList = document.querySelector('.pop-list');
    if (!popList) {
        console.error('.pop-list element not found!');
        return;
    }
    popList.innerHTML = '';
    if (!movies || movies.length === 0) {
        popList.innerHTML = '<p>Фильмы не найдены.</p>';
        return;
    }
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card'; // style.css!
        card.innerHTML = `
            <img src="${movie.posterUrl}" alt="${movie.nameRu}">
            <h3>${movie.nameRu}</h3>
            <div class="movie-desc">
                <p>${movie.year}</p>
                <span class="rating ${getRatingClass(movie.ratingKinopoisk?.toFixed(1))}">${movie.ratingKinopoisk?.toFixed(1) ?? '8/10'}</span>
            </div>
        `;
        card.addEventListener('click', () => onCardClick(movie.kinopoiskId));
        popList.appendChild(card);
    });
}

function renderMoviesByFilters(movies, onCardClick) {
    const filtersWrapper = document.querySelector('.movie-list');
    if (!filtersWrapper) {
        console.error('.pop-list element not found!');
        return;
    }
    filtersWrapper.innerHTML = '';
    if (!movies || movies.length === 0) {
        filtersWrapper.innerHTML = '<p>Фильмы не найдены.</p>';
        return;
    }
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card'; // style.css!
        card.innerHTML = `
            <img src="${movie.posterUrl}" alt="${movie.nameRu}">
            <h3>${movie.nameRu}</h3>
            <div class="movie-desc">
                <p>${movie.year}</p>
                <span class="rating ${getRatingClass(movie.ratingKinopoisk?.toFixed(1))}">${movie.ratingKinopoisk?.toFixed(1) ?? '8/10'}</span>
            </div>
        `;
        card.addEventListener('click', () => onCardClick(movie.kinopoiskId));
        filtersWrapper.appendChild(card);
    });
}


function renderSerials(serials, onCardClick) {
    const popList = document.querySelector('.pop-list');
    if (!popList) {
        console.error('.pop-list не найден');
        return;
    }

    popList.innerHTML = '';

    if (!serials || serials.length === 0) {
        popList.innerHTML = '<p>Сериалы не найдены.</p>';
        return;
    }
    serials.forEach(serial => {
        const card = document.createElement('div');
        card.className = 'movie-card'; // style.css!
        card.innerHTML = `
            <img src="${serial.posterUrl}" alt="${serial.nameRu}">
            <h3>${serial.nameRu}</h3>
            <div class="movie-desc">
                <p>${serial.year}</p>
                <span class="rating ${getRatingClass(serial.ratingKinopoisk?.toFixed(1))}">${serial.ratingKinopoisk?.toFixed(1) ?? '8/10'}</span>
            </div>
        `;
        card.addEventListener('click', () => onCardClick(serial.kinopoiskId));
        popList.appendChild(card);
    });
}

function updateWatchAllSerials() {
    const watchAllButton = document.querySelector('.watch-all');
    watchAllButton.classList.remove('mov')
    watchAllButton.classList.add('ser')
    if (allSerials.length > serialsPerPage * currentSerialPage) {
        watchAllButton.style.display = 'flex'; // Показываем кнопку, если есть еще фильмы
    } else {
        watchAllButton.style.display = 'none'; // Скрываем, если все фильмы показаны
    }
}

function updateWatchAllMovies() {
    const watchAllButton = document.querySelector('.watch-all');
    watchAllButton.classList.remove('ser')
    watchAllButton.classList.add('mov')
    if (allMovies.length > moviesPerPage * currentMoviePage) {
        watchAllButton.style.display = 'flex'; // Показываем кнопку, если есть еще фильмы
    } else {
        watchAllButton.style.display = 'none'; // Скрываем, если все фильмы показаны
    }
}

document.querySelector('.watch-all').addEventListener('click', () => {
    const watchAllBtn = document.querySelector('.watch-all');

    if (watchAllBtn.classList.contains('ser')) {
        // Если это сериалы
        currentSerialPage++;

        // Получаем остальные сериалы
        visibleSerials = allSerials.slice(0, serialsPerPage * currentSerialPage);
        renderSerials(visibleSerials, openModal); // Отрисовываем новые сериалы
        updateWatchAllSerials(); // Обновляем кнопку состояния

    } else if (watchAllBtn.classList.contains('mov')) {
        // Если это фильмы
        currentMoviePage++;

        // Получаем остальные фильмы
        visibleMovies = allMovies.slice(0, moviesPerPage * currentMoviePage);
        renderMovies(visibleMovies, openModal); // Отрисовываем новые фильмы
        updateWatchAllMovies(); // Обновляем кнопку состояния
    } else {
        console.error("Неизвестный тип контента.");
    }
});

// document.querySelector('.watch-all').addEventListener('click', () => {
//     const watchAllBtn = document.querySelector('.watch-all');

//     if (watchAllBtn.classList.contains('ser')) {
//         // Если это сериалы
//         currentSerialPage++;

//         // Получаем остальные сериалы
//         visibleSerials = allSerials.slice(0, serialsPerPage * currentSerialPage);
//         renderSerials(visibleSerials, openModal); // Отрисовываем новые сериалы
//         updateWatchAllSerials(); // Обновляем кнопку состояния

//     } else if (watchAllBtn.classList.contains('mov')) {
//         // Если это фильмы
//         currentMoviePage++;

//         // Получаем остальные фильмы
//         visibleMovies = allMovies.slice(0, moviesPerPage * currentMoviePage);
//         renderMovies(visibleMovies, openModal); // Отрисовываем новые фильмы
//         updateWatchAllMovies(); // Обновляем кнопку состояния
//     } else {
//         console.error("Неизвестный тип контента.");
//     }
// });




export function renderMovieSearchResults(films, openModal) {
    console.log("renderMovieSearchResults: Фильмы, пришедшие в функцию:", films);

    if (!films || films.length === 0) {
        alert("renderMovieSearchResults: Фильмы не найдены.");
        return;
    }

    // Сохраняем данные о фильмах в sessionStorage
    sessionStorage.setItem('searchResults', JSON.stringify(films));
    // Перенаправляем на страницу результатов
    window.location.href = '/search-results.html';
}




