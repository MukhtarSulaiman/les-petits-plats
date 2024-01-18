import { fetchRecipes } from './utils/fetchRecipes.js';
import { displayRecipes } from './utils/displayRecipes.js';
import { mainSearch } from './searches/mainSearch.js';

const datalistContainerIngredients = document.querySelector('.datalist-container-ingredients');

const iconChevronUp = datalistContainerIngredients.querySelector('.icon-chevron-up-ingredients');
const iconChevronDown = datalistContainerIngredients.querySelector('.icon-chevron-down-ingredients');
const datalist = datalistContainerIngredients.querySelector('ul');
const ingredientTagsContainer = document.getElementById('ingredient-tags-container');



[iconChevronUp, iconChevronDown].map((chevronIcon) => {
	chevronIcon.addEventListener('click', (event) => {
		datalist.parentElement.classList.toggle('!block');
		iconChevronUp.classList.toggle('hidden');
		iconChevronDown.classList.toggle('!block');
	});
});


let tagsList = [];

export const selectIngredients = (recipes) => {
	Array.from(datalist.children).map((element) => {
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

			// if (tagsList.length > 0) {
			//     for (let i = 0; i < tagsList.length; i++) {
			// //         if (tagsList[i].toLowerCase() !== currentTag.textContent.toLowerCase()) {
			// //             ingredientTagsContainer.appendChild(div);
			// //             datalist.parentElement.classList.toggle('!block');

			// //         } else {
			// //             tagsList.push(currentTag.textContent);
			// //             ingredientTagsContainer.appendChild(div);
			// //             datalist.parentElement.classList.toggle('!block');
			// //         };
			//     }
			// // } else {
			// //     tagsList.push(currentTag.textContent);
			// //     ingredientTagsContainer.appendChild(div);
			// //     datalist.parentElement.classList.toggle('!block');
			// };

			// console.log(recipes.length);
            tagsList.push(currentTag.textContent);
            // console.log(tagsList)
			ingredientTagsContainer.appendChild(div);
			datalist.parentElement.classList.toggle('!block');

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
    // const removeTagButtons = Array.from(ingredientTagsContainer.querySelectorAll('div>i'));

    // removeTagButtons.forEach((button, index) => {
    //     ingredientTagsContainer.addEventListener('click', (event) => {
    //         console.log(event.target.previousSibling.textContent);
    //     });
    // });
};

const init = async () => {
	const {recipes} = await fetchRecipes();

	displayRecipes(recipes);
	mainSearch(recipes);
	// uniquifyIgredients(recipes);
};

init();
