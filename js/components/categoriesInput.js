import { getMoviesByCategory } from '../api/kinopoiskApi.js'

export function initCategoriesInput(renderResults, openModal) {
    document.getElementById('searchButton').addEventListener('click', () => {
        const type = document.getElementById('type-input').value
        const country = document.getElementById('country-input').value
        const year = document.getElementById('year-input').value
        console.log(`type - ${type}, country - ${country}, year - ${year}`)
        getMoviesByCategory({ type, country, year }).then(movies => renderResults(movies, openModal))
    })
}
// getMoviesByCategory