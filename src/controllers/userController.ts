const queries = require("../postgresql/queries");
import { Request, Response } from "express";

exports.getAllUserRecipes = async (req: Request, res: Response) => {
  const recipes = await queries.getAllUserRecipes(req.params.user);
  return recipes;
};

exports.getAllUserRecipeBoxes = async (req: Request, res: Response) => {
  const recipeBoxes = await queries.getAllUserRecipeBoxes(req.params.user);
  return recipeBoxes;
};

exports.postUserRecipeBox = async (req: Request, res: Response) => {
  const user_id = req.params.user;
  const { name, description } = req.body;
  const recipeBox = await queries.createRecipeBox(user_id, name, description);
  return recipeBox;
};

exports.putRecipeBox = async (req: Request, res: Response) => {
  const recipe_box_id = req.params.box;
  const recipeBox = await queries.updateRecipeBox(recipe_box_id, req.body);
  return recipeBox;
};

exports.postUserRecipe = async (req: Request, res: Response) => {
  const user_id = req.params.user;
  const { name, link, description, has_made, favorite, recipe_box_id } =
    req.body;
  const recipeBox = await queries.createRecipe(
    user_id,
    name,
    link,
    description,
    has_made,
    favorite,
    recipe_box_id
  );
  return recipeBox;
};
