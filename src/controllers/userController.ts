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
