import { mainSearch } from './searches/mainSearch.js';
import { fetchRecipes } from './utils/fetchRecipes.js';
import { displayRecipes } from './utils/displayRecipes.js';
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

export const selectedTags = {
    ingredients: [],
    appliance: [],
    ustensils: [],
};


//---------------- Filters section -----------------
export const filteringRecipes = (recipes, tagLabel, tagStatus, filterType) => {
    filteredRecipes = [];
    
    // Adding tags section
    if (tagStatus === 'adding') {
        if (filterType === 'ingredients') {
            for (let i = 0; i < recipes.length; i++) {
                for (let j = 0; j < recipes[i].ingredients.length; j++) {
                    if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(tagLabel.toLowerCase())) {
                        filteredRecipes.push(recipes[i]);
                        break;
                    }
                }
            }
        } else if (filterType === 'appliance') { 
            for (let i = 0; i < recipes.length; i++) {
                if (recipes[i].appliance.toLowerCase().includes(tagLabel.toLowerCase())) {
                    filteredRecipes.push(recipes[i]);
                }
            }
        } else if (filterType === 'ustensils') {
            for (let i = 0; i < recipes.length; i++) {
                for (let j = 0; j < recipes[i].ustensils.length; j++) {
                    if (recipes[i].ustensils[j].toLowerCase().includes(tagLabel.toLowerCase())) {
                        filteredRecipes.push(recipes[i]);
                        break;
                    }
                }
            }
        }
    }

    // Removing tags section 
    else if (tagStatus === 'removing') {
        // Removes the targeted tag from it's array
        selectedTags[filterType].splice(selectedTags[filterType].indexOf(tagLabel), 1);

        if (filterType === 'ingredients') {
            if (selectedTags[filterType].length > 0) {
                for (let i = 0; i < initialRecipes.length; i++) {
                    for (let j = 0; j < initialRecipes[i].ingredients.length; j++) {
                        let isMatch = false;

                        for (let tag of selectedTags[filterType]) {
                            if (initialRecipes[i].ingredients[j].ingredient.toLowerCase().includes(tag.toLowerCase())) {
                                    filteredRecipes.push(initialRecipes[i]);
                                    isMatch = true;
                                    break;
                            }
                        }
                        if (isMatch) break;
                    }
                }
            } else {
                if (selectedTags['appliance'].length < 1 && selectedTags['ustensils'].length < 1) {
                    filteredRecipes = [...initialRecipes];
                } else {
                    for (let i = 0; i < initialRecipes.length; i++) {
                        if (initialRecipes[i].appliance.toLowerCase().includes(selectedTags[filterType][0].toLowerCase())) {
                            filteredRecipes.push(initialRecipes[i]);
                        }
                    }
                }
            }
        } else if (filterType === 'appliance') {

            if (selectedTags[filterType].length > 0) {
                for (let i = 0; i < initialRecipes.length; i++) {
                    for (let tag of selectedTags[filterType]) {
                        if (initialRecipes[i].appliance.toLowerCase().includes(tag.toLowerCase())) {
                            filteredRecipes.push(initialRecipes[i]);
                            break;
                        }
                    }
                }
            } else {
                filteredRecipes = [...initialRecipes];
            }

        } else if (filterType === 'ustensils') {

        	if (selectedTags[filterType].length > 0) {
                for (let i = 0; i < initialRecipes.length; i++) {
                    for (let j = 0; j < initialRecipes[i].ustensils.length; j++) {
                        let isMatch = false;
                        for (let tag of selectedTags[filterType]) {
                            if (initialRecipes[i].ustensils[j].toLowerCase().includes(tag.toLowerCase())) {
                                filteredRecipes.push(initialRecipes[i]);
                                isMatch = true;
                                break;
                            }
                        }
                        if (isMatch) break;
                    }
                }
            } else {
                if (selectedTags['ingredients'].length < 1 && selectedTags['appliance'].length < 1) {
                    filteredRecipes = [...initialRecipes];
                } else {
                    for (let i = 0; i < initialRecipes.length; i++) {
                        if (initialRecipes[i].appliance.toLowerCase().includes(filterType[0].toLowerCase())) {
                            filteredRecipes.push(initialRecipes[i]);
                        }
                    }
                }
            }
        }
    }

	displayRecipes(filteredRecipes);
};


// Removing tags
export const removeTags = (recipes, removeTagButtons, filterType) => {
    
    removeTagButtons[removeTagButtons.length - 1].addEventListener('click', (event) => {
        const tagLabel = event.target.previousSibling.textContent;
   
        filteringRecipes(recipes, tagLabel, 'removing', filterType);
        event.target.parentElement.remove();
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
