import { createFactoryRecipes } from './factoryRecipes.js';
import { createRecipes } from '../templates/recipesElements.js';
import { uniquifyIgredients } from './uniquifyIgredients.js';

const recipesContainer = document.getElementById('recipes-container');
const totaleRecipesAvailable = document.querySelector('.totale-recipes-available');

// Displaying filtered elements
const displayRecipes = (recipes) => {
    recipesContainer.replaceChildren();

    for (let recipe of recipes) {
        const recipeFactory = createFactoryRecipes(recipe);
        const recipeCard = createRecipes(recipeFactory);

        recipesContainer.appendChild(recipeCard);
    }
    totaleRecipesAvailable.firstChild.textContent = recipes.length;
    
    uniquifyIgredients(recipes);
};

export { displayRecipes };