import * as queries from "../postgresql/queries";
import { Request, Response } from "express";
import logger from "../logger";
import { validateRecipeBoxBody } from "../validations/recipeBox";
import { validateAccessToken } from "../validations/validateAccessToken";

const fileName = "userController.ts";

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
    await validateAccessToken(String(req.headers.authorization));
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

export const getRecipeBox = async (req: Request, res: Response) => {
  try {
    const recipeBoxId = req.params.box;
    const recipeBox = await queries.getRecipeBox(recipeBoxId);
    return recipeBox;
  } catch (error) {
    logger(
      fileName,
      "getRecipeBox",
      `There was an error getting the recipe box ${req.params.box}.`,
      error
    );
    throw error;
  }
};

export const putRecipeBox = async (req: Request, res: Response) => {
  try {
    await validateAccessToken(String(req.headers.authorization));
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
    await validateAccessToken(String(req.headers.authorization));
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

export const getRecipeBoxRecipes = async (req: Request, res: Response) => {
  try {
    const recipeBoxId = req.params.box;
    const recipes = await queries.getRecipeBoxRecipes(recipeBoxId);
    return recipes;
  } catch (error) {
    logger(
      fileName,
      "getRecipeBoxRecipes",
      `There was an error getting all the recipes for recipe box ${req.params.box}.`,
      error
    );
    throw error;
  }
};
