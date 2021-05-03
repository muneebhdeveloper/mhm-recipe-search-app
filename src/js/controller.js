import * as model from './model.js';
import recipeView from './views/recipeView.js';
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
    recipeView.renderError(error.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
