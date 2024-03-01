const hideOrDisplayFilters = (dataListElement, arrowUp, arrowDown) => {
    [arrowUp, arrowDown].map((chevronIcon) => {
        chevronIcon.addEventListener('click', (event) => {
            dataListElement.parentElement.classList.toggle('!block');
            arrowUp.classList.toggle('hidden');
            arrowDown.classList.toggle('!block');
        });
    });
}

export { hideOrDisplayFilters };
