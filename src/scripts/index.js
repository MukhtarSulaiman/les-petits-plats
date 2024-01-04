import { fetchRecipes } from "./utils/fetchRecipes.js";
import { createFactoryRecipes } from "./utils/factoryRecipes.js";
import { createRecipes } from "./templates/recipesElements.js";

const recipesContainer = document.getElementById('recipes-container');

const mainSearchInput = document.querySelector('.main-search-input');
const mainSearchInputIcon = document.querySelector('.main-search-input_search-icon');
const mainSearchInputRemoveIcon = document.querySelector('.main-search-input_remove-icon');

const iconChevronUp = document.querySelector('.datalist-container .icon-chevron-up');
const iconChevronDown = document.querySelector('.datalist-container .icon-chevron-down');
const datalist = document.querySelector('.datalist-container ul');
const totaleRecipesAvailable = document.querySelector('.totale-recipes-available');
const ingredientTagsContainer = document.getElementById('ingredient-tags-container');

// Displaying filtered elements
const displayFilteredElements = (recipes) => {
    recipesContainer.replaceChildren();

    for (let recipe of recipes) {
        const recipeFactory = createFactoryRecipes(recipe);
        const recipeCard = createRecipes(recipeFactory);

        recipesContainer.appendChild(recipeCard);
    }
    totaleRecipesAvailable.firstChild.textContent = recipes.length;
    
    ingredientFilters(recipes);
};

// Main search function
const mainSearch = (recipes) => {
    // listening input event on the main search input
    mainSearchInput.addEventListener('input', (event) => {
        if (event.target.value) {
            mainSearchInputRemoveIcon.classList.add('!block')
            
        } else {
            mainSearchInputRemoveIcon.classList.remove('!block');
        }
    });

    // listening click event on the main search icon
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
                    if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(mainSearchInputValue)) {
                        filteredRecipes.push(recipes[i]);
                        break;
                    }
                }
            }
        }
        displayFilteredElements(filteredRecipes);
    });

    // listening click evnet on the main search input remove icon
    mainSearchInputRemoveIcon.addEventListener('click', (event) => {
        mainSearchInput.value = '';
        mainSearchInputRemoveIcon.classList.remove('!block');

        displayFilteredElements(recipes);
    });

    totaleRecipesAvailable.firstChild.textContent = recipes.length;
};

// ingredient filters
const ingredientFilters = (recipes) => {
    const uniqueIngredients = [];

    datalist.replaceChildren();

    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            if (uniqueIngredients.indexOf(recipes[i].ingredients[j].ingredient) === -1) {
                uniqueIngredients.push(recipes[i].ingredients[j].ingredient);
            }
        }
    }

    for (let ingredient of uniqueIngredients) {
        const li = document.createElement('li');

        li.textContent = ingredient;
        li.classList.add('p-2','rounded-lg','font-thin');

        datalist.appendChild(li);
    }
    selectIngredients();
};

[iconChevronUp, iconChevronDown].map(chevronIcon => {
    chevronIcon.addEventListener('click', (event) => {
        datalist.parentElement.classList.toggle('!block');
        iconChevronUp.classList.toggle('hidden');
        iconChevronDown.classList.toggle('!block');

    });
});

const selectIngredients = () => {
    Array.from(datalist.children).map(element => {
        element.addEventListener('mouseover', (event) => {
            event.target.classList.add('bg-primary', 'cursor-pointer');
        });

        element.addEventListener('mouseleave', (event) => {
            event.target.classList.remove('bg-primary');
        });

        element.addEventListener('click', (event) => {
            // console.log(ingredientTagsContainer)
            // console.log(event.target)

            event.target.classList.add('!list-none', '!p-0')

            const div = document.createElement('div');
            const i = document.createElement('i');

            i.textContent = '✕';
            i.classList.add('cursor-pointer');

            div.appendChild(event.target);
            div.appendChild(i);

            div.classList.add('flex', 'justify-between', 'items-center', 'bg-primary', 'p-3', 'mb-1', 'rounded-lg');
            ingredientTagsContainer.classList.add('w-48', 'mt-12');

            ingredientTagsContainer.appendChild(div);

            datalist.parentElement.classList.toggle('!block');
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
