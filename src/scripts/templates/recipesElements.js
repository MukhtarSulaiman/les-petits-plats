const createRecipes = (recipe) => {
    const recipeCard = document.createElement('div');

    recipeCard.classList.add('relative', 'w-96', 'h-auto', 'bg-white', 'rounded-2xl', 'overflow-hidden');
    recipeCard.innerHTML = `
        <img class="w-full h-64 object-cover" src="./assets/images/dishes/${recipe.image}" alt="">
        <small class="absolute top-5 right-5 rounded-xl w-16 h-6 bg-primary font-light text-center leading-6">${recipe.time}min</small>
        <div class="px-5 py-6">
            <h2 class="text-lg font-anton line-clamp-1">${recipe.name}</h2>
            <div class="mt-5 h-32">
                <h3 class="uppercase font-medium opacity-60 mb-3">Recette</h3>
                <p class="line-clamp-4">${recipe.description}</p>
            </div>
            <div class="mt-5">
                <h3 class="uppercase font-medium opacity-60 mb-3">Ingrédients</h3>
                <div class="w-full flex justify-between items-center flex-wrap gap-5">
                    <div class="w-2/6">
                        <p class="font-light">Lait de coco</p>
                        <small class="opacity-60 text-base font-light">400ml</small>
                    </div>
                    <div class="w-2/6">
                        <p class="font-light">Jus de citron</p>
                        <small class="opacity-60 text-base font-light">2</small>
                    </div>
                    <div class="w-2/6">
                        <p class="font-light">Crème de coco</p>
                        <small class="opacity-60 text-base font-light">4 cuillères</small>
                    </div>
                    <div class="w-2/6">
                        <p class="font-light">Sucre</p>
                        <small class="opacity-60 text-base font-light">20g</small>
                    </div>
                    <div class="w-2/6">
                        <p class="font-light">Glaçons</p>
                        <small class="opacity-60 text-base font-light">2</small>
                    </div>
                </div>
            </div>
        </div>`;

    return recipeCard;
}

export { createRecipes };