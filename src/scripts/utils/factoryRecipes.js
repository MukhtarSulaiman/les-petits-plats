const createFactoryRecipes = ({ image, name, description, time, ingredients }) => {
    return {
        image,
        name,
        description,
        time,
        ingredients,
    }
};

export { createFactoryRecipes };
