import { getRatingClass } from './helpers.js'
import { openModal } from './modal.js';


let allMovies = []; // Массив для хранения всех фильмов
let visibleMovies = []; // Массив для отображаемых фильмов
const moviesPerPage = 8;
let currentPage = 1;

export function renderMovieList(movies, openModal) {
    allMovies = movies; // Сохраняем все фильмы
    currentPage = 1; // Сбрасываем страницу при новом запросе

    // console.log(allMovies)

    visibleMovies = allMovies.slice(0, moviesPerPage); // Берем первые 8 фильмов
    console.log(visibleMovies)
    renderMovies(visibleMovies, openModal);
    updateWatchAllButtonVisibility();

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

function updateWatchAllButtonVisibility() {
    const watchAllButton = document.querySelector('.watch-all');
    if (allMovies.length > moviesPerPage * currentPage) {
        watchAllButton.style.display = 'flex'; // Показываем кнопку, если есть еще фильмы
    } else {
        watchAllButton.style.display = 'none'; // Скрываем, если все фильмы показаны
    }
}

document.querySelector('.watch-all').addEventListener('click', () => {
    currentPage++;
    visibleMovies = allMovies.slice(0, moviesPerPage * currentPage);
    renderMovies(visibleMovies, openModal);
    updateWatchAllButtonVisibility();
});

// export function renderMovieFiltersList(movies, onCardClick) {
//     const movieList = document.querySelector('.movie-list')
//     movieList.innerHTML = ''
//     movies.forEach(movie => {
//         const card = document.createElement('div')
//         card.className = 'movie-card' // style.css!
//         card.innerHTML = `
//             <img src="${movie.posterUrl}" alt="${movie.nameRu}">
//             <h3>${movie.nameRu}</h3>
//             <div class="movie-desc">
//                 <p>${movie.year}</p>
//                 <span class="rating ${getRatingClass(movie.ratingKinopoisk.toFixed(1))}">${movie.ratingKinopoisk.toFixed(1) ?? '8/10'}</span>
//             </div>
//         `
//         card.addEventListener('click', () => onCardClick(movie.kinopoiskId))
//         movieList.appendChild(card)
//     })
// }





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
// export function renderMovieSearchResults(movies, onCardClick) {
//     const container = document.querySelector('#movieResults')
//     container.innerHTML = ''
//     movies.forEach(movie => {
//         const card = document.createElement('div')
//         card.className = 'search-card' // style.css!
//         card.innerHTML = `
//             <div class="res-input-img">
//                 <img src="${movie.posterUrl}" alt="${movie.nameRu}" class="movie-poster">
//             </div>
//             <div class="res-input-desc">
//                 <div class="input-title-desc">
//                     <h2 class="movie-title">${movie.nameRu}</h2>
//                     <div class="input-ratings">
//                         <p class="rate-kino">Кинопоиск: <span>${movie.rating}</span></p>
//                         <p class="rate-nokino">HHI: <span>${movie.rating}</span></p>
//                     </div>
//                 </div>
//                 <div class="input-descriptions">
//                     <div class="input-desc">
//                         <p>${movie.nameRu}</p>
//                     </div>
//                     <div class="input-genre">
//                         <p>Жанр: <span class="genre-info">${movie.genres.map(genreObj => genreObj.genre).join(', ')}</span></p>
//                     </div>
//                     <div class="input-year">
//                         <p>Год: <span class="year-info">${movie.year}</span></p>
//                     </div>
//                     <div class="input-country">
//                         <p>Страна: <span class="country-info">${movie.countries.map(countryObj => countryObj.country).join(', ')}</span></p>
//                     </div>
//                     <div class="input-author">
//                         <p>Режиссер: <span class="author-info">${movie.nameRu}</span></p>
//                     </div>
//                     <div class="input-main-actor">
//                         <p>В главных ролях: <span class="actor-info">${movie.nameRu}</span></p>
//                     </div>
//                     <div class="input-buttons">
//                         <div class="button-watch"><p>Смотреть</p></div>
//                         <div class="button-saved"><p>В избранное</p></div>
//                     </div>
//                 </div>
//             </div>
//         `
//         card.addEventListener('click', () => onCardClick(movie.kinopoiskId))
//         container.appendChild(card)
//     })
// }
