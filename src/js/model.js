import { async } from 'regenerator-runtime';
import { timeout, getJSON } from './helper.js';
import { API_URL } from './config.js';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (recipeID) {
  try {
    const data = await getJSON(`${API_URL}${recipeID}`);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image_url,
      publisher: recipe.publisher,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      source: recipe.source_url,
    };
  } catch (error) {
    throw new Error('Requested recipe not found');
  }
};
