import { getMoviesByCategory } from '../api/kinopoiskApi.js';

export function initCategoriesInput(renderResults, openModal) {
    const form = document.getElementById('movieFiltersForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const type = formData.get('type-input');
        const country = formData.get('country-input').trim();
        const year = formData.get('year-input');

        console.log(`Параметры поиска: type=${type}, country=${country}, year=${year}`);

        try {
            const movies = await getMoviesByCategory({
                type: type || 'ALL',
                country: country || '',
                year: year || ''
            });

            if (movies.length === 0) {
                alert('По запросу ничего не найдено');
            }

            renderResults(movies, openModal);
        } catch (error) {
            console.error('Ошибка при поиске по категориям:', error);
        }
    });
}