const API_KEY = '7af01abb-86cd-4d19-aa08-c80c0f3de581'
const BASE_URL = 'https://kinopoiskapiunofficial.tech/api';


const API_URL_PREMIER = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2025&month=JANUARY';
const API_URL_INTERESTING_MOVIES = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=2';
const API_URL_POPULAR_SERIALS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=POPULAR_SERIES&page=1'
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='
const API_MOVIE_DETAILS = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/'


export async function getPremierMovies() {
    const url = API_URL_INTERESTING_MOVIES
    const data = await fetchJSON(url);
    console.log(data); // Для отладки
    if (data && data.items) {
        return data.items;
    } else {
        console.warn('Нет фильмов для отображения');
        return [];
    }
}


export async function getPopularMovies() {
    console.log('asd')
    const url = API_URL_PREMIER
    const data = await fetchJSON(url)
    console.log(data)
    return data.items.slice(0, 12) || []
}

export async function getInterestingMovies() {
    const url = API_URL_INTERESTING_MOVIES
    const data = await fetchJSON(url)
    console.log(data)
    return data.items.slice(0, 12) || []
}

export async function getPopularSerials() {
    const url = API_URL_POPULAR_SERIALS
    const data = await fetchJSON(url)
    console.log(data)
    return data.items || []
}


export async function getMovieDetails(id) {
    const url = `${BASE_URL}/v2.1/films/${id}`
    console.log('asd2')
    return fetchJSON(url)
}

export async function getMoviesByKeyword(keyword) {
    const url = `${BASE_URL}/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(keyword)}`;
    try {
        const data = await fetchJSON(url);
        console.log('getMoviesByKeyword: Данные, полученные из API:', data);
        return data.films; // Возвращаем data.films
    } catch (error) {
        console.error('getMoviesByKeyword: Ошибка при получении фильмов:', error);
        throw error;
    }
}


export async function getMoviesByCategory({ type, country, year }) {
    const url = `${BASE_URL}/v2.2/films?order=RATING&type=${type}&yearFrom=${year}&yearTo=${year}&country=${country}&page=1`;
    const data = await fetchJSON(url)
    console.log('asd4')
    console.log(data)
    return data.items || []
}

// универсальный fetch со всеми заголовками
async function fetchJSON(url) {
    try {
        const resp = await fetch(url, {
            headers: {
                'X-API-KEY': API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!resp.ok) {
            throw new Error(`Ошибка с fetch: ${resp.status} ${resp.statusText}`);
        }
        return resp.json();
    } catch (error) {
        console.error('Ошибка в fetchJSON:', error);
        throw error; // Пробрасываем дальше, чтобы обработать в самом вызове
    }
}
