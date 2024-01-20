import { fetchRecipes } from './utils/fetchRecipes.js';
import { displayRecipes } from './utils/displayRecipes.js';
import { mainSearch } from './searches/mainSearch.js';

const datalistContainerIngredients = document.querySelector('.datalist-container-ingredients');

const iconChevronUpIngredients = datalistContainerIngredients.querySelector('.icon-chevron-up-ingredients');
const iconChevronDownIngredients = datalistContainerIngredients.querySelector('.icon-chevron-down-ingredients');
const datalistIngredients = datalistContainerIngredients.querySelector('ul');
const ingredientTagsContainer = document.getElementById('ingredient-tags-container');


const datalistContainerAppliance = document.querySelector('.datalist-container-appliance');

const iconChevronUpAppliance = datalistContainerAppliance.querySelector('.icon-chevron-up-appliance');
const iconChevronDownAppliance = datalistContainerAppliance.querySelector('.icon-chevron-down-appliance');
const datalistAppliance = datalistContainerAppliance.querySelector('ul');


//---------------- Appliance section -----------------
[iconChevronUpIngredients, iconChevronDownIngredients].map((chevronIcon) => {
	chevronIcon.addEventListener('click', (event) => {
		datalistIngredients.parentElement.classList.toggle('!block');
		iconChevronUpIngredients.classList.toggle('hidden');
		iconChevronDownIngredients.classList.toggle('!block');
	});
});

export const filterInIngredients = (recipes, ingredientLabel, tagStatus) => {
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
export const removeTags = (recipes) => {
    const removeTagButtons = Array.from(ingredientTagsContainer.querySelectorAll('div>i'));
    
    removeTagButtons[removeTagButtons.length - 1].addEventListener('click', (event) => {
        // console.log(event.target.previousSibling.textContent);
        // filterInIngredients(recipes, event.target.previousSibling.textContent, 'removing');
        console.log('test....')

    });

};


//------------ Appliance section ------------------
[iconChevronUpAppliance, iconChevronDownAppliance].map((chevronIcon) => {
	chevronIcon.addEventListener('click', (event) => {
		datalistAppliance.parentElement.classList.toggle('!block');
		iconChevronUpAppliance.classList.toggle('hidden');
		iconChevronDownAppliance.classList.toggle('!block');
	});
});

const init = async () => {
	const {recipes} = await fetchRecipes();

	displayRecipes(recipes);
	mainSearch(recipes);
};

init();
