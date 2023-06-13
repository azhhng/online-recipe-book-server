const queries = require("../postgresql/queries");
const userService = require("../services/user");
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
  const { name, description, emoji, color } = req.body;
  const recipeBox = await queries.createRecipeBox(
    user_id,
    name,
    description,
    emoji,
    color
  );
  return recipeBox;
};

exports.putRecipeBox = async (req: Request, res: Response) => {
  const recipe_box_id = req.params.box;
  const recipeBox = await queries.updateRecipeBox(recipe_box_id, req.body);
  return recipeBox;
};

exports.deleteRecipeBox = async (req: Request, res: Response) => {
  const recipe_box_id = req.params.box;
  const recipeBox = await queries.deleteRecipeBox(recipe_box_id);
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

exports.putRecipe = async (req: Request, res: Response) => {
  const recipe_id = req.params.id;
  const recipe = await queries.updateRecipe(recipe_id, req.body);
  return recipe;
};

exports.deleteRecipe = async (req: Request, res: Response) => {
  const recipe_id = req.params.id;
  const recipe = await queries.deleteRecipe(recipe_id);
  return recipe;
};

exports.deleteUser = async (req: Request, res: Response) => {
  const user_id = req.params.user;
  const response = await userService.deleteUser(user_id);
  return response;
};

exports.createUser = async (req: Request, res: Response) => {
  const user_id = req.params.user;
  const { name, emoji, color } = req.body;
  const user = await queries.createUser(user_id, name, emoji, color);
  return user;
};

exports.getUser = async (req: Request, res: Response) => {
  const user_id = req.params.user;
  const fields = req.query.fields;
  const response = await userService.getUser(user_id, fields);
  return response;
};
