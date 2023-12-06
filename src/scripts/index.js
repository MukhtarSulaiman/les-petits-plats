import { fetchRecipes } from "./utils/fetchRecipes.js";
import { createFactoryRecipes } from "./utils/factoryRecipes.js";
import { createRecipes } from "./templates/recipesElements.js";

const init = async () => {
    const recipesContainer = document.getElementById('recipes-container');

    const { recipes } = await fetchRecipes();
    
    recipes.forEach(async(recipe) => {
        const recipeFactory = await createFactoryRecipes(recipe);
        const recipeCard = await createRecipes(recipeFactory);

        recipesContainer.appendChild(recipeCard);

    });
}

init();
