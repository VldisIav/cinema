import { getRatingClass } from '../../helpers/helpers.js';

export function createMovieCard(movie, onCardClick) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <img src="${movie.posterUrl}" alt="${movie.nameRu}">
        <h3>${movie.nameRu}</h3>
        <div class="movie-desc">
            <p>${movie.year}</p>
            <span class="rating ${getRatingClass(movie.ratingKinopoisk?.toFixed(1))}">
                ${movie.ratingKinopoisk?.toFixed(1) ?? '8/10'}
            </span>
        </div>
    `;
    card.addEventListener('click', () => onCardClick(movie.kinopoiskId));
    return card;
}