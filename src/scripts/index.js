import { fetchRecipes } from "./utils/fetchRecipes.js";
import { createFactoryRecipes } from "./utils/factoryRecipes.js";
import { createRecipes } from "./templates/recipesElements.js";

const recipesContainer = document.getElementById('recipes-container');

const mainSearchInput = document.querySelector('.main-search-input');
const mainSearchInputIcon = document.querySelector('.main-search-input_search-icon');

const datalistContainer = document.querySelector('.datalist-container');
const iconChevronUp = document.querySelector('.datalist-container .icon-chevron-up');
const iconChevronDown = document.querySelector('.datalist-container .icon-chevron-down');
const datalist = document.querySelector('.datalist-container ul');
const inputSearch = document.querySelector('.datalist-container input')

// Main search function
const mainSearch = (recipes) => {

    mainSearchInputIcon.addEventListener('click', (event) => {
        const mainSearchInputValue = mainSearchInput.value.toLowerCase();

        const filteredRecipes = [];

        for (let i = 0; i < recipes.length; i++) {
           
            if (recipes[i].name.toLowerCase().includes(mainSearchInputValue)) {
                filteredRecipes.push(recipes[i]);
            }
            else if (recipes[i].description.toLowerCase().includes(mainSearchInputValue)) {
                filteredRecipes.push(recipes[i]);
            }
            else if (recipes[i].ingredients.length > 0) {  
                for (let j = 0; j < recipes[i].ingredients.length; j++) {
                    if (recipes[i].id === recipes[j].id) {   
                        if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(mainSearchInputValue)) {
                            filteredRecipes.push(recipes[i]);
                        }
                    }
                }
            }
        }

        recipesContainer.replaceChildren();

        for (let recipe of filteredRecipes) {
            const recipeFactory =  createFactoryRecipes(recipe);
            const recipeCard =  createRecipes(recipeFactory);
    
            recipesContainer.appendChild(recipeCard);
    
            ingredientFilters(recipe);
        }
    });
};

// ingredient filters
const ingredientFilters = (recipes) => {
    const uniqueIngredients = [];

    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            if (uniqueIngredients.indexOf(recipes[i].ingredients[j].ingredient) === -1) {
                uniqueIngredients.push(recipes[i].ingredients[j].ingredient);
            }
        }
    }

    for (let ingredient of uniqueIngredients) {
        const li = document.createElement('li');

        li.classList.add('mb-2','font-thin');
        li.textContent = ingredient;

        datalist.appendChild(li);
    }

    [iconChevronUp, iconChevronDown].map(chevronIcon => {
        chevronIcon.addEventListener('click', (event) => {
            // datalistContainer.classList.toggle('')
            datalist.parentElement.classList.toggle('!block');
            iconChevronUp.classList.toggle('hidden');
            iconChevronDown.classList.toggle('!block');
    
        });
    });
};



const init = async () => {

    const { recipes } = await fetchRecipes();
    
    recipes.forEach(recipe => {
        const recipeFactory = createFactoryRecipes(recipe);
        const recipeCard = createRecipes(recipeFactory);

        recipesContainer.appendChild(recipeCard);
    });

    mainSearch(recipes);
    ingredientFilters(recipes);
};

init();
