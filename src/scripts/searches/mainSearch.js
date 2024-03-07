import { displayRecipes } from '../utils/displayRecipes.js';

const mainSearchInput = document.querySelector('.main-search-input');
const mainSearchInputIcon = document.querySelector('.main-search-input_search-icon');
const mainSearchInputRemoveIcon = document.querySelector('.main-search-input_remove-icon');
const totaleRecipesAvailable = document.querySelector('.totale-recipes-available');

// Main search function
const mainSearch = (recipes) => {
	// listening input event on the main search input
	mainSearchInput.addEventListener('input', (event) => {
		if (event.target.value) {
			mainSearchInputRemoveIcon.classList.add('!block');
		} else {
			mainSearchInputRemoveIcon.classList.remove('!block');
		}
	});

	// listening click event on the main search icon
    mainSearchInputIcon.addEventListener('click', (event) => {
       
		const mainSearchInputValue = mainSearchInput.value.toLowerCase();
		const filteredRecipes = [];

        if (mainSearchInputValue.length >= 3) {

            const filteredRecipes = recipes.filter(recipe => {
                if (recipe.name.toLowerCase().includes(mainSearchInputValue)) return recipe;
                else if (recipe.description.toLowerCase().includes(mainSearchInputValue)) return recipe;
                else if (recipe.ingredients.length > 0) {
                    for (let j = 0; j < recipe.ingredients.length; j++) {
                        if (recipe.ingredients[j].ingredient.toLowerCase().includes(mainSearchInputValue)) return recipe;
                    }
                }
            });
            displayRecipes(filteredRecipes, mainSearchInputValue);
        }
	});

	// listening click evnet on the main search input remove icon
	mainSearchInputRemoveIcon.addEventListener('click', (event) => {
		mainSearchInput.value = '';
		mainSearchInputRemoveIcon.classList.remove('!block');

		displayRecipes(recipes);
	});

	totaleRecipesAvailable.firstChild.textContent = recipes.length;
};

export { mainSearch };
