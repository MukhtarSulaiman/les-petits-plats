const fetchRecipes = async () => {
    try {
        const response = await fetch('./data/recipes.json');

        if (!response.ok) {
            throw new Error('Un problème est survenu lors de la récupération des données');
        }

        const data = await response.json();

        console.log('Les données sont récupérées avec succès !');

        return data;

    } catch (error) {
        console.error(error);
    }
};

export { fetchRecipes };