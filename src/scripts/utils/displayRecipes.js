import { createFactoryRecipes } from './factoryRecipes.js';
import { createRecipes } from '../templates/recipesElements.js';
import { uniquifyIgredients } from './uniquifyIgredients.js';
import { uniquifyAppliance } from './uniquifyAppliance.js';
import { uniquifyUstensils } from './uniquifyUstensils.js';

const recipesContainer = document.getElementById('recipes-container');
const alertMessage = document.getElementById('alert-message');
const totaleRecipesAvailable = document.querySelector('.totale-recipes-available');

// Displaying filtered elements
const displayRecipes = (recipes, searchValue) => {
    recipesContainer.replaceChildren();
 
    if (recipes.length > 0) {
        alertMessage.classList.remove('!flex')

        for (let recipe of recipes) {
            const recipeFactory = createFactoryRecipes(recipe);
            const recipeCard = createRecipes(recipeFactory);
    
            recipesContainer.appendChild(recipeCard);
        }
    } else {
        alertMessage.classList.add('!flex');
        alertMessage.innerHTML = `Aucune recette contient <span class="text-primary mx-1">${searchValue}</span>  ! Vous pouvez chercher tarte aux pommes, poisson, etc.`;
    }

    totaleRecipesAvailable.firstChild.textContent = recipes.length;
    
    uniquifyIgredients(recipes);
    uniquifyAppliance(recipes);
    uniquifyUstensils(recipes);
};

export { displayRecipes };