import { createMovieCard } from './movieCard.js';

export function createMovieList(containerSelector, itemsPerPage = 8) {
    let allItems = [];
    let visibleItems = [];
    let currentPage = 1;
    let type = 'mov';
    const container = document.querySelector(containerSelector);

    function render(items, onCardClick) {
        visibleItems = items;
        container.innerHTML = '';

        if (!items || items.length === 0) {
            container.innerHTML = '<p>Ничего не найдено.</p>';
            return;
        }

        items.forEach(item => {
            container.appendChild(createMovieCard(item, onCardClick));
        });
    }

    function initialize(items, itemType, onCardClick) {
        allItems = items;
        currentPage = 1;
        type = itemType;
        render(items.slice(0, itemsPerPage), onCardClick);
        updateWatchAllButton();
    }

    function loadMore() {
        currentPage++;
        const newItems = allItems.slice(0, itemsPerPage * currentPage);
        render(newItems);
        updateWatchAllButton();
    }

    function updateWatchAllButton() {
        const watchAllButton = document.querySelector('.watch-all');
        if (!watchAllButton) return;

        watchAllButton.classList.remove('mov', 'ser');
        watchAllButton.classList.add(type);

        const hasMoreItems = allItems.length > itemsPerPage * currentPage;
        watchAllButton.style.display = hasMoreItems ? 'flex' : 'none';
    }

    return {
        initialize,
        loadMore,
        render
    };
}