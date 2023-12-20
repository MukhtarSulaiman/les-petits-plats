import { fetchRecipes } from "./utils/fetchRecipes.js";
import { createFactoryRecipes } from "./utils/factoryRecipes.js";
import { createRecipes } from "./templates/recipesElements.js";

const recipesContainer = document.getElementById('recipes-container');

const mainSearchInputIcon = document.querySelector('.main-search-input_search-icon');

const datalistContainer = document.querySelector('.datalist-container');
const iconChevronUp = document.querySelector('.datalist-container .icon-chevron-up');
const iconChevronDown = document.querySelector('.datalist-container .icon-chevron-down');
const datalist = document.querySelector('.datalist-container ul');
const inputSearch = document.querySelector('.datalist-container input')

// Main search function
const mainSearch = (recipes) => {

    mainSearchInputIcon.addEventListener('click', (event) => {
        const mainSearchInputValue = mainSearchInputIcon.previousElementSibling.value;

        const filteredRecipes = [];

        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].name.includes(mainSearchInputValue)) {
                filteredRecipes.push(recipes[i]);
            }
        }

        recipesContainer.replaceChildren();

        for (let recipe of filteredRecipes) {
            const recipeFactory =  createFactoryRecipes(recipe);
            const recipeCard =  createRecipes(recipeFactory);
    
            recipesContainer.appendChild(recipeCard);
    
            filters(recipe.ingredients);
        }
    });

};

// Filters
const filters = (ingredients) => {
    // inputSearch.style.display
    ingredients.forEach(ingredient => {
        // const li = document.createElement('li');

        // li.setAttribute('value', ingredient.ingredient);
        // li.classList.add('');

        // datalist.appendChild(li);
    });
    

}

[iconChevronUp, iconChevronDown].map(chevronIcon => {
    chevronIcon.addEventListener('click', (event) => {
        datalist.classList.toggle('h-auto');
        iconChevronUp.classList.toggle('hidden');
        iconChevronDown.classList.toggle('!block');
        datalist.parentElement.classList.toggle('!block');
    });
});


const init = async () => {

    const { recipes } = await fetchRecipes();
    
    recipes.forEach(recipe => {
        const recipeFactory =  createFactoryRecipes(recipe);
        const recipeCard =  createRecipes(recipeFactory);

        recipesContainer.appendChild(recipeCard);

        filters(recipe.ingredients);

    });

    mainSearch(recipes);
}

init();
