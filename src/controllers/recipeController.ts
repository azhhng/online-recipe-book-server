import * as queries from "../postgresql/queries";
import * as userTransactionController from "./userTransactionController";
import * as userController from "./userController";
import * as recipeBoxController from "./recipeBoxController";
import { Request, Response } from "express";
import logger from "../logger";
import { validateRecipeBody } from "../validations/recipe";

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

export const getAllVerifiedUsersRecipes = async (
  req: Request,
  res: Response
) => {
  try {
    const recipes = await queries.getAllVerifiedUsersRecipes();
    return recipes;
  } catch (error) {
    logger(
      fileName,
      "getAllVerifiedUsersRecipes",
      `There was an error getting all verified users' recipes.`,
      error
    );
    throw error;
  }
};

export const postRecipe = async (req: Request, res: Response) => {
  try {
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
    await userTransactionController.createUserTransactionRecipe(
      userId,
      recipe_box_id,
      recipeBox[0].recipe_id,
      "create"
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
    const recipeId = BigInt(req.params.id);
    const recipe = await queries.updateRecipe(recipeId, req.body);
    const userId = await userController.getUserFromRecipe(recipeId);
    const recipeBoxId = await recipeBoxController.getRecipeBoxFromRecipe(
      recipeId
    );
    await userTransactionController.createUserTransactionRecipe(
      userId,
      recipeBoxId,
      recipeId,
      "update"
    );
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
    const recipeId = BigInt(req.params.id);
    const recipe = await queries.deleteRecipe(recipeId);
    const userId = await userController.getUserFromRecipe(recipeId);
    const recipeBoxId = await recipeBoxController.getRecipeBoxFromRecipe(
      recipeId
    );
    await userTransactionController.createUserTransactionRecipe(
      userId,
      recipeBoxId,
      recipeId,
      "delete"
    );
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
