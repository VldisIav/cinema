import { getPopularMovies, getInterestingMovies, getPremierMovies, getMovieDetails, getMoviesByKeyword, getMoviesByCategory, getPopularSerials } from './api/kinopoiskApi.js'
import { renderPoster } from './components/poster.js'
import { renderMovieList, renderMovieSearchResults, renderSerialsList, renderMovieListByFilters } from './components/movieCard.js'
import { openModal } from './components/modal.js'
import { initSearchInput } from './components/searchInput.js'
import { initCategoriesInput } from './components/categoriesInput.js'; // Исправлено


// Главный старт. Подгружаем премьеру.

// getPremierMovies().then(data => {
//     console.log('Премьера:', data.slice(0, 3))
//     renderPoster(data.slice(2, 3), openModal); // Передаем openModalAndRedirect
// }).catch(error => {
//     console.error('Ошибка при загрузке популярных фильмов:', error);
// });

// getPopularMovies().then(data => {
//     console.log('Популярные фильмы:', data); // Для отладки
//     renderMovieList(data, openModal);
// }).catch(error => {
//     console.error('Ошибка при загрузке популярных фильмов:', error); // Логгирование ошибок
// });




document.querySelector('.categories-films').addEventListener('click', () => {
    console.log('Клик по популярным фильмам')
    getPopularMovies().then(data => renderMovieList(data, openModal))
})


document.querySelector('.categories-serials').addEventListener('click', () => {
    console.log('Клик по популярным сериалам!')
    console.log(document.querySelector('.watch-all'))
    getPopularSerials().then(data => renderSerialsList(data, openModal))
})

document.querySelector('.categories-favourite').addEventListener('click', () => {
    console.log('Клик по Подборке из фильмов: ')
    getInterestingMovies().then(data => renderMovieList(data, openModal))

})

document.querySelector('#searchButton').addEventListener('click', () => {
    console.log('Поиск по категориям: ')
    initCategoriesInput(renderMovieListByFilters, openModal)

})
// initSearchInput(renderMovieSearchResults, openModal)


