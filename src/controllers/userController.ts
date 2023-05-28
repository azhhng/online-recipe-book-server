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
