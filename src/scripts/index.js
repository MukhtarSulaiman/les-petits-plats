import { fetchRecipes } from './utils/fetchRecipes.js';
import { displayRecipes } from './utils/displayRecipes.js';
import { mainSearch } from './searches/mainSearch.js';
import { hideOrDisplayFilters } from './utils/hideOrDisplayFilters.js';

const datalistContainerIngredients = document.querySelector('.datalist-container-ingredients');
const iconChevronUpIngredients = datalistContainerIngredients.querySelector('.icon-chevron-up-ingredients');
const iconChevronDownIngredients = datalistContainerIngredients.querySelector('.icon-chevron-down-ingredients');
const datalistIngredients = datalistContainerIngredients.querySelector('ul');

const datalistContainerAppliance = document.querySelector('.datalist-container-appliance');
const iconChevronUpAppliance = datalistContainerAppliance.querySelector('.icon-chevron-up-appliance');
const iconChevronDownAppliance = datalistContainerAppliance.querySelector('.icon-chevron-down-appliance');
const datalistAppliance = datalistContainerAppliance.querySelector('ul');

const datalistContainerUstensils = document.querySelector('.datalist-container-ustensils');
const iconChevronUpUstensils = datalistContainerUstensils.querySelector('.icon-chevron-up-ustensils');
const iconChevronDownUstensils = datalistContainerUstensils.querySelector('.icon-chevron-down-ustensils');
const datalistUstensils = datalistContainerUstensils.querySelector('ul');

let initialRecipes = [];
let filteredRecipes = [];

export let ingredientsTagsList = [];
export let applianceTagsList = [];
export let ustensilTagsList = [];

//---------------- Ingredients section -----------------
export const filterInIngredients = (recipes, ingredientLabel, tagStatus) => {
	filteredRecipes = [];

	if (tagStatus === 'adding') {
		for (let i = 0; i < recipes.length; i++) {
			for (let j = 0; j < recipes[i].ingredients.length; j++) {
				if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(ingredientLabel.toLowerCase())) {
					filteredRecipes.push(recipes[i]);
					break;
				}
			}
		}
	} else if (tagStatus === 'removing') {
		ingredientsTagsList.splice(ingredientsTagsList.indexOf(ingredientLabel), 1);

		if (ingredientsTagsList.length > 0) {
			for (let i = 0; i < recipes.length; i++) {
				for (let j = 0; j < recipes[i].ingredients.length; j++) {
					for (let tag of ingredientsTagsList) {
						if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(tag.toLowerCase())) {
							if (filteredRecipes.indexOf(recipes[i]) === -1) {
								filteredRecipes.push(recipes[i]);
								break;
							}
						}
					}
				}
			}
		} else {
			if (applianceTagsList.length < 1) {
				filteredRecipes = [...initialRecipes];
			} else {
				for (let i = 0; i < recipes.length; i++) {
					if (recipes[i].appliance.toLowerCase().includes(applianceTagsList[0].toLowerCase())) {
						filteredRecipes.push(recipes[i]);
					}
				}
			}
		}
	}

	displayRecipes(filteredRecipes);
};

//------------ Appliance section ------------------
export const filterInAppliance = (recipes, applianceLabel, tagStatus) => {
	console.log(ingredientsTagsList);
	console.log(applianceTagsList);
	// console.log(tagStatus)

	let filteredRecipes = [];

	if (tagStatus === 'adding') {
		for (let i = 0; i < recipes.length; i++) {
			if (recipes[i].appliance.toLowerCase().includes(applianceLabel.toLowerCase())) {
				filteredRecipes.push(recipes[i]);
			}
		}
	} else if (tagStatus === 'removing') {
		applianceTagsList.splice(applianceTagsList.indexOf(applianceLabel), 1);

		if (applianceTagsList.length > 0) {
			for (let i = 0; i < recipes.length; i++) {
				// for (let tag of applianceTagsList) {
				//     if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(tag.toLowerCase())) {
				//         if (filteredRecipes.indexOf(recipes[i]) === -1) {
				//             filteredRecipes.push(recipes[i]);
				//             break;
				//         }
				//     }
				// }
			}
		} else {
			filteredRecipes = [...initialRecipes];
		}
	}

	displayRecipes(filteredRecipes);
};

//------------ Ustensils section ------------------
export const filterInUstensils = (recipes, ustensilLabel, tagStatus) => {
	let filteredRecipes = [];

	if (tagStatus === 'adding') {
		for (let i = 0; i < recipes.length; i++) {
			for (let j = 0; j < recipes[i].ustensils.length; j++) {
				if (recipes[i].ustensils[j].toLowerCase().includes(ustensilLabel.toLowerCase())) {
					filteredRecipes.push(recipes[i]);
					break;
				}
			}
		}
	} else if (tagStatus === 'removing') {
		applianceTagsList.splice(applianceTagsList.indexOf(ustensilLabel), 1);

		if (applianceTagsList.length > 0) {
		} else {
			filteredRecipes = [...initialRecipes];
		}
	}

	displayRecipes(filteredRecipes);
};

// Removing tags
export const removeTags = (recipes, removeTagButtons, filterType) => {
	removeTagButtons[removeTagButtons.length - 1].addEventListener('click', (event) => {
		if (filterType === 'ingredients') {
			filterInIngredients(recipes, event.target.previousSibling.textContent, 'removing');
			event.target.parentElement.remove();
		} else if (filterType === 'appliance') {
			filterInAppliance(recipes, event.target.previousSibling.textContent, 'removing');
			event.target.parentElement.remove();
		} else if (filterType === 'ustensils') {
			filterInUstensils(recipes, event.target.previousSibling.textContent, 'removing');
			event.target.parentElement.remove();
		}
	});
};

// Init the recipes
const init = async () => {
	const {recipes} = await fetchRecipes();

	initialRecipes = recipes;

	displayRecipes(recipes);
	mainSearch(recipes);

	hideOrDisplayFilters(datalistIngredients, iconChevronUpIngredients, iconChevronDownIngredients);
	hideOrDisplayFilters(datalistAppliance, iconChevronUpAppliance, iconChevronDownAppliance);
	hideOrDisplayFilters(datalistUstensils, iconChevronUpUstensils, iconChevronDownUstensils);
};

init();
