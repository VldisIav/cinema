
// import {fetchJSON }

export function renderPoster(movies, openModal) {
    const container = document.querySelector('.poster-container');
    if (!container) {
        console.error("Poster container not found in the DOM.");
        return; // Exit if the container doesn't exist
    }

    container.innerHTML = '';
    if (!movies || movies.length === 0) { // Check if movies is null or undefined
        container.innerHTML = '<p>No movies to display.</p>'; // Display a message
        return;
    }

    const movie = movies[0];
    const genres = movie.genres?.map(g => g.genre).join(', ') || 'Unknown'; // Use optional chaining and default value

    container.innerHTML = `
        <div class="poster-text">
            <h1>УЖЕ В КИНО!</h1>
            <div class="poster-text-name">${movie.nameRu} (${movie.year})</div>
            <div class="poster-text-desc">Жанры: ${genres}</div>
            <div class="poster-text-button" data-id="${movie.kinopoiskId}"><p>Смотреть</p></div>
        </div>
        <div class="poster-image">
            <img src="${movie.posterUrlPreview}" alt="${movie.nameRu} Poster">
        </div>
    `;

    const watchButton = container.querySelector('.poster-text-button');
    if (watchButton) {
        watchButton.addEventListener('click', () => {
            const movieId = watchButton.dataset.id;
            console.log('Клик по кнопке "Смотреть" с ID:', movieId);
            openModal(movieId);
        });
    }
}
