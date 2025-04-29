export function setupPagination(movieList, serialList) {
    document.querySelector('.watch-all')?.addEventListener('click', () => {
        const watchAllBtn = document.querySelector('.watch-all');

        if (watchAllBtn.classList.contains('ser')) {
            serialList.loadMore();
        } else if (watchAllBtn.classList.contains('mov')) {
            movieList.loadMore();
        }
    });
}