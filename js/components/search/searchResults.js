import { openModal } from '../modal.js';

export function initSearchResultsPage() {
    document.querySelector('.back').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    const searchResultsContainer = document.getElementById('searchResultsContainer');
    const searchResultsString = sessionStorage.getItem('searchResults');

    if (searchResultsString) {
        const films = JSON.parse(searchResultsString);
        sessionStorage.removeItem('searchResults');
        renderMovies(films);
    } else {
        searchResultsContainer.innerHTML = '<p>Ничего не найдено.</p>';
    }

    function renderMovies(films) {
        searchResultsContainer.innerHTML = '';

        if (!films || films.length === 0) {
            searchResultsContainer.innerHTML = '<p>Фильмы не найдены.</p>';
            return;
        }

        films.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'search-card';
            card.innerHTML = `
                <div class="res-input-img">
                    <img src="${movie.posterUrl}" alt="${movie.nameRu}" class="res-movie-poster">
                </div>
                <div class="res-input-desc">
                    <div class="input-title-desc">
                        <h2 class="res-movie-title">${movie.nameRu}</h2>
                        <div class="input-ratings">
                            <p class="rate-kino">Кинопоиск: <span>${movie.rating}</span></p>
                            <p class="rate-nokino">HHI: <span>${movie.rating}</span></p>
                        </div>
                    </div>
                    <div class="input-descriptions">
                        <div class="input-descriptions-descriptions">
                            <p>${movie.description || 'Описание отсутствует'}</p>
                        </div>
                        <div class="input-genre">
                            <p>Жанр: <span class="genre-info">${movie.genres ? movie.genres.map(genreObj => genreObj.genre).join(', ') : 'Не указано'
                }</span></p>
                        </div>
                        <div class="input-year">
                            <p>Год: <span class="year-info">${movie.year || 'Не указан'}</span></p>
                        </div>
                        <div class="input-country">
                            <p>Страна: <span class="country-info">${movie.countries ? movie.countries.map(countryObj => countryObj.country).join(', ') : 'Не указана'
                }</span></p>
                        </div>
                    </div>
                    <div class="input-buttons">
                        <p class="watch-button" data-id="${movie.filmId}">Смотреть</p>
                    <div class="button-saved"><p>В избранное</p></div>
                </div>
                </div>
            `;
            searchResultsContainer.appendChild(card);
        });
        const watchButtons = document.querySelectorAll('.watch-button');
        watchButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const movieId = e.target.dataset.id;

                if (movieId) {
                    openModal(movieId);
                } else {
                    console.error('ID фильма не найден');
                }
            });
        });
    }
}

initSearchResultsPage(); // вот так!