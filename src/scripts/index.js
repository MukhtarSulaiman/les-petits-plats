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

const datalistContainerUtensils = document.querySelector('.datalist-container-utensils');
const iconChevronUpUtensils = datalistContainerUtensils.querySelector('.icon-chevron-up-utensils');
const iconChevronDownUtensils = datalistContainerUtensils.querySelector('.icon-chevron-down-utensils');
const datalistUtensils = datalistContainerUtensils.querySelector('ul');


let initialRecipes = [];
let filteredRecipes = [];

export const selectedTags = {
    ingredients: [],
    appliance: [],
    utensils: [],
};

//---------------- Filters section -----------------
export const filteringRecipes = (recipes, tagLabel, tagStatus, filterType) => {
    filteredRecipes = [];

    const isMatchingTag = (item, tagArray) => {
        return tagArray.some(tag => item.toLowerCase().includes(tag.toLowerCase()));
    };

    // Adding tags section
    if (tagStatus === 'adding') {
        const toLowerCaseTagLabel = tagLabel.toLowerCase();

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const isMatch =
                (filterType === 'ingredients' && recipe.ingredients.some(ingredient => isMatchingTag(ingredient.ingredient, [toLowerCaseTagLabel]))) ||
                (filterType === 'appliance' && isMatchingTag(recipe.appliance, [toLowerCaseTagLabel])) ||
                (filterType === 'utensils' && recipe.utensils.some(utensil => isMatchingTag(utensil, [toLowerCaseTagLabel])));

            if (isMatch) {
                filteredRecipes.push(recipe);
            }
        }
    }

    // Removing tags section
    else if (tagStatus === 'removing') {
        // Removes the targeted tag from its array
        selectedTags[filterType].splice(selectedTags[filterType].indexOf(tagLabel), 1);
    
        if (
            selectedTags.ingredients.length < 1 &&
            selectedTags.appliance.length < 1 &&
            selectedTags.utensils.length < 1
        ) {
            filteredRecipes = [...initialRecipes];
        } else {
            for (let i = 0; i < initialRecipes.length; i++) {
                const recipe = initialRecipes[i];
                let isMatch = false;
        
                // Check for each tag in ingredients array
                for (let tag of selectedTags.ingredients) {
                    if (recipe.ingredients.some(ingredient => isMatchingTag(ingredient.ingredient, [tag]))) {
                        isMatch = true;
                        break;
                    }
                }
        
                 // Check for each tag in appliance array
                for (let tag of selectedTags.appliance) {
                    if (isMatchingTag(recipe.appliance, [tag])) {
                        isMatch = true;
                        break;
                    }
                }
        
                // Check for each tag in utensils array
                for (let tag of selectedTags.utensils) {
                    if (recipe.utensils.some(utensil => isMatchingTag(utensil, [tag]))) {
                        isMatch = true;
                        break;
                    }
                }
               
                if (isMatch) {
                    filteredRecipes.push(recipe);
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
	hideOrDisplayFilters(datalistUtensils, iconChevronUpUtensils, iconChevronDownUtensils);
};

init();
