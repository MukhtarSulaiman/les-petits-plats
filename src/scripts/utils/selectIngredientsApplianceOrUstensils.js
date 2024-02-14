import { filterInIngredients, filterInAppliance, removeTags, tagsList, applianceTagsList } from '../index.js';

const ingredientTagsContainer = document.getElementById('ingredient-tags-container');
const applianceTagsContainer = document.getElementById('appliance-tags-container');

const selectIngredientsApplianceOrUstensils = (recipes, datalistElement, tagsContainer, filterType) => {
	Array.from(datalistElement.children).map((element) => {
		element.addEventListener('mouseover', (event) => {
			event.target.classList.add('bg-primary', 'cursor-pointer');
		});

		element.addEventListener('mouseleave', (event) => {
			event.target.classList.remove('bg-primary');
		});

		element.addEventListener('click', (event) => {
			const currentTag = event.target;

			currentTag.classList.add('!list-none', '!p-0');

			const div = document.createElement('div');
			const i = document.createElement('i');

			i.textContent = '✕';
			i.classList.add('cursor-pointer');

			div.appendChild(currentTag);
			div.appendChild(i);

			div.classList.add('flex', 'justify-between', 'items-center', 'bg-primary', 'p-3', 'mb-1', 'rounded-lg');

			if (!tagsList.includes(currentTag.textContent)) {
				tagsList.push(currentTag.textContent);
				tagsContainer.appendChild(div);
			}

			datalistElement.parentElement.classList.toggle('!block');

            if (filterType === 'ingredients') {
                const removeTagButtons = Array.from(ingredientTagsContainer.querySelectorAll('div>i'));

				filterInIngredients(recipes, currentTag.textContent, 'adding');
				removeTags(recipes, removeTagButtons);
            } else if (filterType === 'appliance') {
                const removeTagButtons = Array.from(applianceTagsContainer.querySelectorAll('div>i'));

				filterInAppliance(recipes, currentTag.textContent, 'adding');
				removeTags(recipes, removeTagButtons);
            } else if (filterType === 'ustensils') {
                
			}
		});
	});
};

export {selectIngredientsApplianceOrUstensils};
