import { fetchRecipes } from "./utils/fetchRecipes.js";
import { createFactoryRecipes } from "./utils/factoryRecipes.js";
import { createRecipes } from "./templates/recipesElements.js";

const recipesContainer = document.getElementById('recipes-container');
const mainSearchInputIcon = document.querySelector('.main-search-input_search-icon');


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

        filteredRecipes.forEach(async(recipe) => {
            const recipeFactory = await createFactoryRecipes(recipe);
            const recipeCard = await createRecipes(recipeFactory);
    
            recipesContainer.appendChild(recipeCard);
    
            filters(recipe.ingredients);
    
        });
    });

};


const init = async () => {

    const { recipes } = await fetchRecipes();
    
    recipes.forEach(recipe => {
        const recipeFactory =  createFactoryRecipes(recipe);
        const recipeCard =  createRecipes(recipeFactory);

        recipesContainer.appendChild(recipeCard);

    });

    mainSearch(recipes);
}

init();
