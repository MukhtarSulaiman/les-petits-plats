import { fetchRecipes } from "./utils/fetchRecipes.js";
import { createFactoryRecipes } from "./utils/factoryRecipes.js";
import { createRecipes } from "./templates/recipesElements.js";

const recipesContainer = document.getElementById('recipes-container');

const mainSearchInputIcon = document.querySelector('.main-search-input_search-icon');

const datalistContainer = document.querySelector('.datalist-container');
const datalist = document.querySelector('.datalist-container>datalist');
const inputSearch = document.querySelector('.datalist-container input')


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

        for (let i = 0; i < filteredRecipes.length; i++) {
            const recipeFactory =  createFactoryRecipes(filteredRecipes[i]);
            const recipeCard =  createRecipes(recipeFactory);
    
            recipesContainer.appendChild(recipeCard);
    
            filters(filteredRecipes[i].ingredients);
        }
    });

};

// Filters
const filters = (ingredients) => {
    // inputSearch.style.display
    ingredients.forEach(ingredient => {
        const option = document.createElement('option');

        option.setAttribute('value', ingredient.ingredient);
        // option.classList.add('');

        datalist.appendChild(option);
    });

    datalistContainer.addEventListener('click', (event) => {
        // datalist.parentElement.classList.toggle('datalist-collapse');
        event.preventDefault();
    });
}


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
