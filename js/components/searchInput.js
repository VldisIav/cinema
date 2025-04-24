import { getMoviesByKeyword } from '../api/kinopoiskApi.js'

export function initSearchInput(renderResults, openModal) {
    const form = document.querySelector('.header-input')
    const search = document.querySelector('.form-input')

    form.addEventListener('submit', e => {
        e.preventDefault()
        const query = search.value.trim()
        if (query) {
            getMoviesByKeyword(query).then(movies => renderResults(movies, openModal))
        }
        document.querySelector('.watch-all').style = 'flex'
    })
}
