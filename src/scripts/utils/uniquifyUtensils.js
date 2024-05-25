import { selectIngredientsApplianceOrUtensils } from './selectIngredientsApplianceOrUtensils.js';

const datalistContainerUtensils = document.querySelector('.datalist-container-utensils');
const searchInput = datalistContainerUtensils.querySelector('input');
const datalistUtensils = datalistContainerUtensils.querySelector('ul');
const unstensilTagsContainer = document.getElementById('utensil-tags-container');

// Uniquify utensils names
const uniquifyUtensils = (recipes) => {
	let uniqueUtensils = [];

	for (let i = 0; i < recipes.length; i++) {
		for (let j = 0; j < recipes[i].utensils.length; j++) {
			if (uniqueUtensils.indexOf(recipes[i].utensils[j]) === -1) {
				uniqueUtensils.push(recipes[i].utensils[j]);
			}
		}
	}
	displayUtensils(recipes, uniqueUtensils);
	
	searchInput.addEventListener('input', (event) => {
		let temperaryUniqueUtensils = [];

		if (event.target.value) {
			for (let i = 0; i < uniqueUtensils.length; i++) {
				if (uniqueUtensils[i].toLowerCase().includes(event.target.value.toLowerCase())) {
					temperaryUniqueUtensils.push(uniqueUtensils[i]);
				}
			}
		} else temperaryUniqueUtensils = uniqueUtensils;
		displayUtensils(recipes, temperaryUniqueUtensils);
	});
};

// Display utensils
const displayUtensils = (recipes, uniqueUtensils) => {
	datalistUtensils.replaceChildren();

	for (let utensil of uniqueUtensils) {
		const li = document.createElement('li');

		li.textContent = utensil[0].toUpperCase() + utensil.slice(1);
		li.classList.add('p-2', 'rounded-lg', 'font-thin');

		datalistUtensils.appendChild(li);
	}

	selectIngredientsApplianceOrUtensils(recipes, datalistUtensils, unstensilTagsContainer, 'utensils');
};

export { uniquifyUtensils };
