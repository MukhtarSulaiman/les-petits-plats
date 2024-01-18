import { selectIngredients } from '../index.js'

const datalistContainer = document.querySelector('.datalist-container');
const searchInput = datalistContainer.querySelector('input');
const datalist = datalistContainer.querySelector('ul');

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
    datalist.replaceChildren();

    for (let ingredient of uniqueIngredients) {
        const li = document.createElement('li');

        li.textContent = ingredient;
        li.classList.add('p-2', 'rounded-lg', 'font-thin');

        datalist.appendChild(li);
    }

    selectIngredients(recipes);
};

export { uniquifyIgredients };