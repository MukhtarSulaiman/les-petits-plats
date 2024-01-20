import { selectAppliance } from '../index.js'

const datalistContainerAppliance = document.querySelector('.datalist-container-appliance');
const searchInput = datalistContainerAppliance.querySelector('input');
const datalist = datalistContainerAppliance.querySelector('ul');

// Uniquify appliance names
const uniquifyAppliance = (recipes) => {
	let uniqueAppliance = [];

	for (let i = 0; i < recipes.length; i++) {
        if (uniqueAppliance.indexOf(recipes[i].appliance) === -1) {
            uniqueAppliance.push(recipes[i].appliance);
        }
    }
    displayAppliance(recipes, uniqueAppliance);
    
    searchInput.addEventListener('input', (event) => {
        let temperaryUniqueAppliance = [];

        if (event.target.value) {
            for (let i = 0; i < uniqueAppliance.length; i++) {
                if (uniqueAppliance[i].toLowerCase().includes(event.target.value.toLowerCase())) {
                    temperaryUniqueAppliance.push(uniqueAppliance[i]);
                }
            }
        } else temperaryUniqueAppliance = uniqueAppliance;
        displayAppliance(recipes, temperaryUniqueAppliance);
    });
};

// Display appliance
const displayAppliance = (recipes, uniqueAppliance) => {
    datalist.replaceChildren();

    for (let ingredient of uniqueAppliance) {
        const li = document.createElement('li');

        li.textContent = ingredient;
        li.classList.add('p-2', 'rounded-lg', 'font-thin');

        datalist.appendChild(li);
    }

    selectAppliance(appliance);
};

export { uniquifyAppliance };