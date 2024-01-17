import { selectIngredients } from '../index.js'

const datalist = document.querySelector('.datalist-container ul');

// Uniquify ingredients names
const uniquifyIgredients = (recipes) => {
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
		li.classList.add('p-2', 'rounded-lg', 'font-thin');

		datalist.appendChild(li);
	}
	selectIngredients(recipes);
};

export { uniquifyIgredients };