import { getMovieDetails } from '../api/kinopoiskApi.js'
import { durationToMinutes } from './helpers.js'

const modalEl = document.getElementById('movieModal')

export async function openModal(id) {
    const respData = await getMovieDetails(id)
    const movie = respData.data

    const countries = movie.countries.map(c => c.country).join(', ')
    let descriptionText = movie.description || ''
    let descriptionDisplay = descriptionText.length > 120
        ? `${descriptionText.slice(0, 120)}... <span id="readMoreButton" style="color: gray; cursor: pointer;">Читать полностью</span>`
        : descriptionText

    modalEl.innerHTML = `
        <div class="modal-content">
            <span class="close" id="closeModal">&times;</span>
            <div class="modal-header">
                <img src="${movie.posterUrl}" alt="Poster" class="modal-image">
                <h2 class="modal-title">${movie.nameRu}</h2>
            </div>
            <p id="modalDescription" class="modal-description">${descriptionDisplay}</p>
            <p><strong>Страна:</strong> <span id="modalCountry">${countries}</span></p>
            <p><strong>Продолжительность:</strong> <span id="modalDuration">${durationToMinutes(movie.filmLength)}</span></p>
            <a href="${movie.webUrl}" target="_blank"><button class="watch-button">Смотреть</button></a>
        </div>
    `
    modalEl.classList.add('modal-show')

    document.getElementById('closeModal').onclick = closeModal
    if (descriptionText.length > 120) {
        document.getElementById('readMoreButton').onclick = () => {
            document.getElementById('modalDescription').innerHTML = descriptionText
        }
    }
}

export function closeModal() {
    modalEl.classList.remove('modal-show')
}

window.addEventListener('click', e => { if (e.target === modalEl) closeModal() })
window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal() })
