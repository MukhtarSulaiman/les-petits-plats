const fetchRecipes = async () => {
    try {
        const response = await fetch('./src/data/recipes.json');

        if (!response.ok) {
            throw new Error('Un problème est survenu lors de la récupération des données');
        }

        const data = await response.json();


        return data;

    } catch (error) {
        console.error(error);
    }
};

export { fetchRecipes };