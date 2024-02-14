import {fetchRecipes} from './utils/fetchRecipes.js';
import {displayRecipes} from './utils/displayRecipes.js';
import {mainSearch} from './searches/mainSearch.js';

const datalistContainerIngredients = document.querySelector('.datalist-container-ingredients');

const iconChevronUpIngredients = datalistContainerIngredients.querySelector('.icon-chevron-up-ingredients');
const iconChevronDownIngredients = datalistContainerIngredients.querySelector('.icon-chevron-down-ingredients');
const datalistIngredients = datalistContainerIngredients.querySelector('ul');
const ingredientTagsContainer = document.getElementById('ingredient-tags-container');

const datalistContainerAppliance = document.querySelector('.datalist-container-appliance');

const iconChevronUpAppliance = datalistContainerAppliance.querySelector('.icon-chevron-up-appliance');
const iconChevronDownAppliance = datalistContainerAppliance.querySelector('.icon-chevron-down-appliance');
const datalistAppliance = datalistContainerAppliance.querySelector('ul');

//---------------- Ingredients section -----------------
[iconChevronUpIngredients, iconChevronDownIngredients].map((chevronIcon) => {
	chevronIcon.addEventListener('click', (event) => {
		datalistIngredients.parentElement.classList.toggle('!block');
		iconChevronUpIngredients.classList.toggle('hidden');
		iconChevronDownIngredients.classList.toggle('!block');
	});
});

let initialRecipess = [];
export let tagsList = [];

export const filterInIngredients = (recipes, ingredientLabel, tagStatus) => {
	let filteredRecipes = [];

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
		tagsList.splice(tagsList.indexOf(ingredientLabel), 1);
		
		if (tagsList.length > 0) {
            for (let i = 0; i < recipes.length; i++) {
                for (let j = 0; j < recipes[i].ingredients.length; j++) {
                    for (let tag of tagsList) {
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
			filteredRecipes = [...initialRecipess];
		}
	}

	displayRecipes(filteredRecipes);
};

export const removeTags = (recipes) => {
	const removeTagButtons = Array.from(ingredientTagsContainer.querySelectorAll('div>i'));

	removeTagButtons[removeTagButtons.length - 1].addEventListener('click', (event) => {
		filterInIngredients(recipes, event.target.previousSibling.textContent, 'removing');
		event.target.parentElement.remove();
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


export let applianceTagsList = [];

export const filterInAppliance = (recipes, applianceLabel, tagStatus) => {
    console.log(recipes)
    console.log(applianceLabel)
    console.log(tagStatus)

    let filteredRecipes = [];

	if (tagStatus === 'adding') {
		for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].appliance.toLowerCase().includes(applianceLabel.toLowerCase())) {
                filteredRecipes.push(recipes[i]);
            }
		}
    } else if (tagStatus === 'removing') {
		tagsList.splice(applianceTagsList.indexOf(applianceLabel), 1);
		// console.log(applianceTagsList);
		if (applianceTagsList.length > 0) {
            for (let i = 0; i < recipes.length; i++) {
               
                for (let tag of applianceTagsList) {
                    if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(tag.toLowerCase())) {
                        if (filteredRecipes.indexOf(recipes[i]) === -1) {
                            filteredRecipes.push(recipes[i]);
                            break;
                        }
                    }
				}
			}
		} else {
			filteredRecipes = [...initialRecipess];
		}
	}
    
    displayRecipes(filteredRecipes);

};

const init = async () => {
	const {recipes} = await fetchRecipes();

    initialRecipess = recipes;

	displayRecipes(recipes);
	mainSearch(recipes);
};

init();
