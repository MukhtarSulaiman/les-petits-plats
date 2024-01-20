const selectIngredientsApplianceOrUstensils = (recipes, datalistElement, tagsContainer) => {
    Array.from(datalistElement.children).map((element) => {
        // console.log(datalistElement)
        // console.log(tagsContainer)


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

			tagsContainer.appendChild(div);
			datalistElement.parentElement.classList.toggle('!block');

            // filterInAppliance(recipes, currentTag.textContent, 'adding');
            // removeApplianceTags(recipes);
		});
	});
};

export { selectIngredientsApplianceOrUstensils };