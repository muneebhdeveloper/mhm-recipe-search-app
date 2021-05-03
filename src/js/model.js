import { async } from 'regenerator-runtime';
import { timeout, getJSON } from './helper.js';
import { API_URL, RESULT_PER_PAGE } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    pagesCount: 1,
    resultsPerPage: RESULT_PER_PAGE,
  },
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
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    state.search.results = [];

    const data = await getJSON(`${API_URL}?search=${query}`);

    if (data.data.recipes.length < 1) {
      throw new Error();
      return;
    }

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image_url,
        publisher: recipe.publisher,
      };
    });

    console.log(state.search);
  } catch (error) {
    throw error;
  }
};
