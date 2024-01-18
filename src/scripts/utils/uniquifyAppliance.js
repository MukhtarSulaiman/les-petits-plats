import { selectAppliance } from '../index.js'

const datalistContainerAppliance = document.querySelector('.datalist-container-appliance');
const searchInput = datalistContainerAppliance.querySelector('input');
const datalist = datalistContainerAppliance.querySelector('ul');

// Uniquify appliance names
const uniquifyAppliance = (appliance) => {
	let uniqueAppliance = [];

	for (let i = 0; i < appliance.length; i++) {
        if (uniqueAppliance.indexOf(appliance[i].appliance) === -1) {
            uniqueAppliance.push(appliance[i].appliance);
        }
    }
    displayAppliance(appliance, uniqueAppliance);
    
    searchInput.addEventListener('input', (event) => {
        let temperaryUniqueAppliance = [];

        if (event.target.value) {
            for (let i = 0; i < uniqueAppliance.length; i++) {
                if (uniqueAppliance[i].toLowerCase().includes(event.target.value.toLowerCase())) {
                    temperaryUniqueAppliance.push(uniqueAppliance[i]);
                }
            }
        } else temperaryUniqueAppliance = uniqueAppliance;
        displayAppliance(appliance, temperaryUniqueAppliance);
    });
};

// Display appliance
const displayAppliance = (appliance, uniqueAppliance) => {
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