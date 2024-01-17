import { fetchRecipes } from './utils/fetchRecipes.js';
import { displayRecipes } from './utils/displayRecipes.js';
import { mainSearch } from './searches/mainSearch.js';

// const recipesContainer = document.getElementById('recipes-container');

// const mainSearchInput = document.querySelector('.main-search-input');
// const mainSearchInputIcon = document.querySelector('.main-search-input_search-icon');
// const mainSearchInputRemoveIcon = document.querySelector('.main-search-input_remove-icon');
// const ingredientsInput = document.querySelector('.datalist-container input');
// const totaleRecipesAvailable = document.querySelector('.totale-recipes-available');

const iconChevronUp = document.querySelector('.datalist-container .icon-chevron-up');
const iconChevronDown = document.querySelector('.datalist-container .icon-chevron-down');
const datalist = document.querySelector('.datalist-container ul');
const ingredientTagsContainer = document.getElementById('ingredient-tags-container');


// ingredient filters
const ingredientFilters = (recipes) => {
	const uniqueIngredients = [];

	datalist.replaceChildren();

	for (let i = 0; i < recipes.length; i++) {
		for (let j = 0; j < recipes[i].ingredients.length; j++) {
			if (uniqueIngredients.indexOf(recipes[i].ingredients[j].ingredient) === -1) {
				uniqueIngredients.push(recipes[i].ingredients[j].ingredient);
			}
		}
	}

	for (let ingredient of uniqueIngredients) {
		const li = document.createElement('li');

		li.textContent = ingredient;
		li.classList.add('p-2', 'rounded-lg', 'font-thin');

		datalist.appendChild(li);
	}
	selectIngredients(recipes);
};

[iconChevronUp, iconChevronDown].map((chevronIcon) => {
	chevronIcon.addEventListener('click', (event) => {
		datalist.parentElement.classList.toggle('!block');
		iconChevronUp.classList.toggle('hidden');
		iconChevronDown.classList.toggle('!block');
	});
});

// ingredientsInput.addEventListener('inpu')

let tagsList = [];

const selectIngredients = (recipes) => {
	Array.from(datalist.children).map((element) => {
		element.addEventListener('mouseover', (event) => {
			event.target.classList.add('bg-primary', 'cursor-pointer');
		});

		element.addEventListener('mouseleave', (event) => {
			event.target.classList.remove('bg-primary');
		});

		element.addEventListener('click', (event) => {
			event.target.classList.add('!list-none', '!p-0');

			const div = document.createElement('div');
			const i = document.createElement('i');

			i.textContent = '✕';
			i.classList.add('cursor-pointer');

			div.appendChild(event.target);
			div.appendChild(i);

			div.classList.add('flex', 'justify-between', 'items-center', 'bg-primary', 'p-3', 'mb-1', 'rounded-lg');

			// if (tagsList.length > 0) {
			//     for (let i = 0; i < tagsList.length; i++) {
			// //         if (tagsList[i].toLowerCase() !== event.target.textContent.toLowerCase()) {
			// //             ingredientTagsContainer.appendChild(div);
			// //             datalist.parentElement.classList.toggle('!block');

			// //         } else {
			// //             tagsList.push(event.target.textContent);
			// //             ingredientTagsContainer.appendChild(div);
			// //             datalist.parentElement.classList.toggle('!block');
			// //         };
			//     }
			// // } else {
			// //     tagsList.push(event.target.textContent);
			// //     ingredientTagsContainer.appendChild(div);
			// //     datalist.parentElement.classList.toggle('!block');
			// };

			console.log(recipes.length);
			tagsList.push(event.target.textContent);
			ingredientTagsContainer.appendChild(div);
			datalist.parentElement.classList.toggle('!block');

			filterInIngredients(recipes, event.target.textContent, 'adding');
			removeTags(recipes);
		});
	});
};

const filterInIngredients = (recipes, ingredientLabel, tagStatus) => {
	const filteredRecipes = [];

	for (let i = 0; i < recipes.length; i++) {
		if (recipes[i].ingredients.length > 0) {
			for (let j = 0; j < recipes[i].ingredients.length; j++) {
				if (tagStatus === 'adding') {
					if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(ingredientLabel.toLowerCase())) {
						filteredRecipes.push(recipes[i]);
						break;
					}
				} else if (tagStatus === 'removing') {
					if (!recipes[i].ingredients[j].ingredient.toLowerCase().includes(ingredientLabel.toLowerCase())) {
						filteredRecipes.push(recipes[i]);
						break;
					}
				}
			}
		}
	}
	displayRecipes(filteredRecipes);
};

//
const removeTags = (recipes) => {
	Array.from(ingredientTagsContainer.querySelectorAll('div>i')).map((icon) => {
		icon.addEventListener('click', (event) => {
			filterInIngredients(recipes, event.target.previousSibling.textContent, 'removing');
			event.target.parentElement.remove();
		});
	});
};

const init = async () => {
	const {recipes} = await fetchRecipes();

	displayRecipes(recipes);
	mainSearch(recipes);
	// ingredientFilters(recipes);
};

init();
