import * as queries from "../postgresql/queries";
import { Request, Response } from "express";
import logger from "../logger";
import { validateRecipeBody } from "../validations/recipe";
import { validateAccessToken } from "../validations/validateAccessToken";

const fileName = "userController.ts";

export const getAllUserRecipes = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user;
    const recipes = await queries.getAllUserRecipes(userId);
    return recipes;
  } catch (error) {
    logger(
      fileName,
      "getAllUserRecipes",
      `There was an error getting all of user ${req.params.user}'s recipes.`,
      error
    );
    throw error;
  }
};

export const postRecipe = async (req: Request, res: Response) => {
  try {
    await validateAccessToken(String(req.headers.authorization));
    const userId = req.params.user;
    const { name, link, description, has_made, favorite, recipe_box_id } =
      req.body;
    validateRecipeBody(name, link, recipe_box_id);
    const recipeBox = await queries.createRecipe(
      userId,
      name,
      link,
      description,
      has_made,
      favorite,
      recipe_box_id
    );
    return recipeBox;
  } catch (error) {
    logger(
      fileName,
      "postRecipe",
      `There was an error creating a recipe for user ${req.params.user}.`,
      error
    );
    throw error;
  }
};

export const putRecipe = async (req: Request, res: Response) => {
  try {
    await validateAccessToken(String(req.headers.authorization));
    const recipeId = req.params.id;
    const recipe = await queries.updateRecipe(BigInt(recipeId), req.body);
    return recipe;
  } catch (error) {
    logger(
      fileName,
      "putRecipe",
      `There was an error editing the recipe ${req.params.id}.`,
      error
    );
    throw error;
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    await validateAccessToken(String(req.headers.authorization));
    const recipeId = req.params.id;
    const recipe = await queries.deleteRecipe(recipeId);
    return recipe;
  } catch (error) {
    logger(
      fileName,
      "deleteRecipe",
      `There was an error deleting the recipe ${req.params.id}.`,
      error
    );
    throw error;
  }
};
