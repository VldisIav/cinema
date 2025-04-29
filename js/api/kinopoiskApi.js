const API_KEY = '7af01abb-86cd-4d19-aa08-c80c0f3de581'
const BASE_URL = 'https://kinopoiskapiunofficial.tech/api';


const API_URL_PREMIER = `${BASE_URL}/v2.2/films/premieres?year=2025&month=JANUARY `
const API_URL_INTERESTING_MOVIES = `${BASE_URL}/v2.2/films/collections?type=TOP_POPULAR_ALL&page=2`
const API_URL_POPULAR_SERIALS = `${BASE_URL}/v2.2/films/collections?type=POPULAR_SERIES&page=1`


export async function getPremierMovies() {
    const url = API_URL_INTERESTING_MOVIES
    const data = await fetchJSON(url);
    if (data && data.items) {
        return data.items;
    } else {
        console.warn('Нет фильмов для отображения');
        return [];
    }
}


export async function getPopularMovies() {
    const url = API_URL_PREMIER
    const data = await fetchJSON(url)
    return data.items || []
}

export async function getInterestingMovies() {
    const url = API_URL_INTERESTING_MOVIES
    const data = await fetchJSON(url)
    return data.items || []
}

export async function getPopularSerials() {
    const url = API_URL_POPULAR_SERIALS
    const data = await fetchJSON(url)
    return data.items || []
}


export async function getMovieDetails(id) {
    const url = `${BASE_URL}/v2.1/films/${id}`
    return fetchJSON(url)
}

export async function getMoviesByKeyword(keyword) {
    const url = `${BASE_URL}/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(keyword)}`;
    try {
        const data = await fetchJSON(url);
        return data.films;
    } catch (error) {
        console.error('getMoviesByKeyword: Ошибка при получении фильмов:', error);
        throw error;
    }
}

export async function getMoviesByCategory({ type, country, year }) {
    const params = new URLSearchParams({
        order: 'RATING',
        page: 1
    });

    if (type) params.append('type', type);

    if (country && Array.isArray(country) && country.length > 0) {
        country.forEach(c => params.append('countries', c));
    }

    if (year) {
        params.append('yearFrom', year);
        params.append('yearTo', year);
    }

    const url = `${BASE_URL}/v2.2/films?${params.toString()}`

    try {
        const data = await fetchJSON(url);
        return data.items || [];
    } catch (error) {
        console.error('Ошибка при получении фильмов по категориям:', error);
        return [];
    }
}

async function fetchJSON(url) {
    try {
        const resp = await fetch(url, {
            headers: {
                'X-API-KEY': API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!resp.ok) {
            const errorMessage = `Ошибка с fetch: ${resp.status} ${resp.statusText}`;
            throw new Error(errorMessage);
        }
        return resp.json();
    } catch (error) {
        console.error('Ошибка в fetchJSON:', error);
        throw error;
    }
}
