const queries = require("../postgresql/queries");

exports.getAllUserRecipes = async (req, res) => {
  const recipes = await queries.getAllUserRecipes(req.params.user);
  return recipes;
};

exports.getAllUserRecipeBoxes = async (req, res) => {
  const recipeBoxes = await queries.getAllUserRecipeBoxes(req.params.user);
  return recipeBoxes;
};
