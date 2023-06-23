import * as queries from "../postgresql/queries";
import * as userService from "../services/user";
import { Request, Response } from "express";
import logger from "../logger";
import { validateRecipeBoxBody } from "../validations/recipeBox";
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

export const getAllUserRecipeBoxes = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user;
    const recipeBoxes = await queries.getAllUserRecipeBoxes(userId);
    return recipeBoxes;
  } catch (error) {
    logger(
      fileName,
      "getAllUserRecipeBoxes",
      `There was an error getting all of user ${req.params.user}'s recipe boxes.`,
      error
    );
    throw error;
  }
};

export const postRecipeBox = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user;
    const { name, description, emoji, color } = req.body;
    validateRecipeBoxBody(name, emoji, color);
    const recipeBox = await queries.createRecipeBox(
      userId,
      name,
      description,
      emoji,
      color
    );
    return recipeBox;
  } catch (error) {
    logger(
      fileName,
      "postRecipeBox",
      `There was an error creating a recipe box for user ${req.params.user}.`,
      error
    );
    throw error;
  }
};

export const putRecipeBox = async (req: Request, res: Response) => {
  try {
    const recipeBoxId = req.params.box;
    const box = req.body;
    const recipeBox = await queries.updateRecipeBox(BigInt(recipeBoxId), box);
    return recipeBox;
  } catch (error) {
    logger(
      fileName,
      "putRecipeBox",
      `There was an error editing the recipe box ${req.params.box}.`,
      error
    );
    throw error;
  }
};

export const deleteRecipeBox = async (req: Request, res: Response) => {
  try {
    const recipeBoxId = req.params.box;
    const recipeBox = await queries.deleteRecipeBox(recipeBoxId);
    return recipeBox;
  } catch (error) {
    logger(
      fileName,
      "deleteRecipeBox",
      `There was an error deleting the recipe box ${req.params.box}.`,
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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user;
    const response = await userService.deleteUser(userId);
    return response;
  } catch (error) {
    logger(
      fileName,
      "deleteUser",
      `There was an error deleting the user ${req.params.user}.`,
      error
    );
    throw error;
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user;
    const { name, emoji, color } = req.body;
    const user = await queries.createUser(userId, name, emoji, color);
    return user;
  } catch (error) {
    logger(
      fileName,
      "createUser",
      `There was an error creating the user ${req.params.user}.`,
      error
    );
    throw error;
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user;
    const response = await queries.getUser(userId);
    return response;
  } catch (error) {
    logger(
      fileName,
      "getUser",
      `There was an error getting the user ${req.params.user}.`,
      error
    );
    throw error;
  }
};

export const getUserAuth0 = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user;
    const fields = req.query.fields as string;
    if (!userId || !fields) {
      throw new Error(
        "User ID and Auth0 fields must be present when getting the Auth0 data for the user."
      );
    }
    const userAuth0 = await userService.getUserAuth0(userId, fields);
    return userAuth0;
  } catch (error) {
    logger(
      fileName,
      "getUserAuth0",
      `There was an error getting the user ${req.params.user}'s information from Auth0.`,
      error
    );
    throw error;
  }
};

export const putUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user;
    const user = await queries.updateUser(userId, req.body);
    return user;
  } catch (error) {
    logger(
      fileName,
      "putUser",
      `There was an error editing the user ${req.params.user}.`,
      error
    );
    throw error;
  }
};
