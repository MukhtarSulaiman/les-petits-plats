import { fetchRecipes } from './utils/fetchRecipes.js';
import { displayRecipes } from './utils/displayRecipes.js';
import { mainSearch } from './searches/mainSearch.js';

const datalistContainerIngredients = document.querySelector('.datalist-container-ingredients');

const iconChevronUpIngredients = datalistContainerIngredients.querySelector('.icon-chevron-up-ingredients');
const iconChevronDownIngredients = datalistContainerIngredients.querySelector('.icon-chevron-down-ingredients');
const datalistIngredients = datalistContainerIngredients.querySelector('ul');
const ingredientTagsContainer = document.getElementById('ingredient-tags-container');


const datalistContainerAppliance = document.querySelector('.datalist-container-appliance');

const iconChevronUpAppliance = datalistContainerAppliance.querySelector('.icon-chevron-up-appliance');
const iconChevronDownAppliance = datalistContainerAppliance.querySelector('.icon-chevron-down-appliance');
const datalistAppliance = datalistContainerAppliance.querySelector('ul');
const applianceTagsContainer = document.getElementById('appliance-tags-container');


//---------------- Appliance section -----------------
[iconChevronUpIngredients, iconChevronDownIngredients].map((chevronIcon) => {
	chevronIcon.addEventListener('click', (event) => {
		datalistIngredients.parentElement.classList.toggle('!block');
		iconChevronUpIngredients.classList.toggle('hidden');
		iconChevronDownIngredients.classList.toggle('!block');
	});
});

let tagsList = [];

export const selectIngredients = (recipes) => {
	Array.from(datalistIngredients.children).map((element) => {
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

            tagsList.push(currentTag.textContent);

			ingredientTagsContainer.appendChild(div);
			datalistIngredients.parentElement.classList.toggle('!block');

            filterInIngredients(recipes, currentTag.textContent, 'adding');
			removeTags(recipes);
		});
	});
};

const filterInIngredients = (recipes, ingredientLabel, tagStatus) => {
    const filteredRecipes = [];

	for (let i = 0; i < recipes.length; i++) {
		if (recipes[i].ingredients.length > 0) {
			for (let j = 0; j < recipes[i].ingredients.length; j++) {
				if (tagStatus === 'adding') {
					if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(ingredientLabel.toLowerCase())) {
						filteredRecipes.push(recipes[i]);
						break;
					}
				} else if (tagStatus === 'removing') {
					if (!recipes[i].ingredients[j].ingredient.toLowerCase().includes(ingredientLabel.toLowerCase())) {
						filteredRecipes.push(recipes[i]);
						break;
					}
				}
			}
		}
	}
	displayRecipes(filteredRecipes);
};

//
const removeTags = (recipes) => {
    const removeTagButtons = Array.from(ingredientTagsContainer.querySelectorAll('div>i'));
    
    removeTagButtons[removeTagButtons.length - 1].addEventListener('click', (event) => {
        // console.log(event.target.previousSibling.textContent);
        // filterInIngredients(recipes, event.target.previousSibling.textContent, 'removing');
        console.log('test....')

    });

};


//------------ Appliance section ------------------
[iconChevronUpAppliance, iconChevronDownAppliance].map((chevronIcon) => {
	chevronIcon.addEventListener('click', (event) => {
		datalistAppliance.parentElement.classList.toggle('!block');
		iconChevronUpAppliance.classList.toggle('hidden');
		iconChevronDownAppliance.classList.toggle('!block');
	});
});

export const selectAppliance = (recipes) => {
	Array.from(datalistAppliance.children).map((element) => {
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

			applianceTagsContainer.appendChild(div);
			datalistAppliance.parentElement.classList.toggle('!block');

            // filterInAppliance(recipes, currentTag.textContent, 'adding');
			// removeApplianceTags(recipes);
		});
	});
};

const init = async () => {
	const {recipes} = await fetchRecipes();

	displayRecipes(recipes);
	mainSearch(recipes);
};

init();
