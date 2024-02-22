import {selectIngredientsApplianceOrUstensils} from './selectIngredientsApplianceOrUstensils.js';

const datalistContainerUstensils = document.querySelector('.datalist-container-ustensils');
const searchInput = datalistContainerUstensils.querySelector('input');
const datalistUstensils = datalistContainerUstensils.querySelector('ul');
const unstensilTagsContainer = document.getElementById('ustensil-tags-container');

// Uniquify ustensils names
const uniquifyUstensils = (recipes) => {
	let uniqueUstensils = [];

	for (let i = 0; i < recipes.length; i++) {
		for (let j = 0; j < recipes[i].ustensils.length; j++) {
			if (uniqueUstensils.indexOf(recipes[i].ustensils[j]) === -1) {
				uniqueUstensils.push(recipes[i].ustensils[j]);
			}
		}
	}
	displayUstensils(recipes, uniqueUstensils);
	
	searchInput.addEventListener('input', (event) => {
		let temperaryUniqueUstensils = [];

		if (event.target.value) {
			for (let i = 0; i < uniqueUstensils.length; i++) {
				if (uniqueUstensils[i].toLowerCase().includes(event.target.value.toLowerCase())) {
					temperaryUniqueUstensils.push(uniqueUstensils[i]);
				}
			}
		} else temperaryUniqueUstensils = uniqueUstensils;
		displayUstensils(recipes, temperaryUniqueUstensils);
	});
};

// Display ustensils
const displayUstensils = (recipes, uniqueUstensils) => {
	datalistUstensils.replaceChildren();

	for (let ustensil of uniqueUstensils) {
		const li = document.createElement('li');

		li.textContent = ustensil[0].toUpperCase() + ustensil.slice(1);
		li.classList.add('p-2', 'rounded-lg', 'font-thin');

		datalistUstensils.appendChild(li);
	}

	selectIngredientsApplianceOrUstensils(recipes, datalistUstensils, unstensilTagsContainer, 'ustensils');
};

export { uniquifyUstensils };
