import { selectIngredientsApplianceOrUtensils } from './selectIngredientsApplianceOrUtensils.js'

const datalistContainerIngredients = document.querySelector('.datalist-container-ingredients');
const searchInput = datalistContainerIngredients.querySelector('input');
const datalistIngredients = datalistContainerIngredients.querySelector('ul');
const ingredientTagsContainer = document.getElementById('ingredient-tags-container');

// Uniquify ingredients names
const uniquifyIgredients = (recipes) => {
	let uniqueIngredients = [];

	for (let i = 0; i < recipes.length; i++) {
		for (let j = 0; j < recipes[i].ingredients.length; j++) {
			if (uniqueIngredients.indexOf(recipes[i].ingredients[j].ingredient) === -1) {
				uniqueIngredients.push(recipes[i].ingredients[j].ingredient);
			}
		}
    }
    displayIngredients(recipes, uniqueIngredients);
    
    searchInput.addEventListener('input', (event) => {
        let temperaryUniqueIngredients = [];

        if (event.target.value) {
            for (let i = 0; i < uniqueIngredients.length; i++) {
                if (uniqueIngredients[i].toLowerCase().includes(event.target.value.toLowerCase())) {
                    temperaryUniqueIngredients.push(uniqueIngredients[i]);
                }
            }
        } else temperaryUniqueIngredients = uniqueIngredients;
        displayIngredients(recipes, temperaryUniqueIngredients);
    });
};

// Display ingredients
const displayIngredients = (recipes, uniqueIngredients) => {
    datalistIngredients.replaceChildren();

    for (let ingredient of uniqueIngredients) {
        const li = document.createElement('li');

        li.textContent = ingredient;
        li.classList.add('p-2', 'rounded-lg', 'font-thin');

        datalistIngredients.appendChild(li);
    }

    selectIngredientsApplianceOrUtensils(recipes, datalistIngredients, ingredientTagsContainer, 'ingredients');
};

export { uniquifyIgredients };