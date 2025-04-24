

export function renderPoster(movies, openModal) {
    const container = document.querySelector('.poster-container');
    if (!container) {
        console.error("Poster container not found in the DOM.");
        return;
    }

    container.innerHTML = '';
    if (!movies || movies.length === 0) {
        container.innerHTML = '<p>No movies to display.</p>';
        return;
    }

    const movie = movies[0];

    container.innerHTML = `
        <div class="poster-text">
            <h1>УЖЕ В КИНО!</h1>
            <div class="poster-text-name">${movie.nameRu} (${movie.year})</div>
            <div class="poster-text-desc">${movie.description}</div>
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
