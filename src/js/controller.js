import * as model from './model.js';
import searchFieldView from './views/searchFieldView.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // Getting the Receipt ID from URL Hash
    const recipeID = window.location.hash.slice(1);

    // Checking if recipe ID exist or not
    if (!recipeID) return;

    // Render spinner until get the view done
    recipeView.renderSpinner();

    // Send ID to the model to load the recipe from API
    await model.loadRecipe(recipeID);

    // Render the recipe to the view
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchFieldView.getQuery();
    console.log(query);
    if (!query) return;

    // Render spinner until get the view done
    searchView.renderSpinner();

    // Send ID to the model to load the recipe from API
    await model.loadSearchResults(query);

    // Render the recipe to the view
    searchView.render(model.getResultsByPage());

    // Render Pagination
    paginationView.render(model.state.search);
  } catch (error) {
    searchView.renderError();
  }
};

const controlPagination = function (pageNumber) {
  // Render spinner until get the view done
  searchView.renderSpinner();

  // Render the recipe to the view
  searchView.render(model.getResultsByPage(pageNumber));

  // Render Pagination
  paginationView.render(model.state.search);
};

const controlServings = function (operation) {
  // Update the servings
  model.getUpdatedServings(operation);

  // Render the recipe to the view
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  searchFieldView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
