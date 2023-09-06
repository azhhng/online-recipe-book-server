import * as userQueries from "../postgresql/userQueries";
import * as userService from "../services/user";
import { Request, Response } from "express";
import logger from "../logger";

const fileName = "userController.ts";

function splitUserSub(sub: string): string {
  if (!sub) {
    return "";
  }
  return sub.split("|")[1];
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user;
    const { name, emoji, color } = req.body;
    const user = await userQueries.createUser(userId, name, emoji, color);
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
    const response = await userQueries.getUser(userId);
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

export const putUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user;
    const user = await userQueries.updateUser(userId, req.body);
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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userSub = req.params.user;
    const userId = splitUserSub(userSub);
    const response = await userService.deleteUser(userSub, userId);
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

export const getUserFromRecipeBox = async (recipeBoxId: BigInt) => {
  try {
    const userId = await userQueries.getUserFromRecipeBox(recipeBoxId);
    return userId[0].user_id;
  } catch (error) {
    logger(
      fileName,
      "getUserFromRecipeBox",
      `There was an error getting the user_id from the recipe box ${recipeBoxId}.`,
      error
    );
    throw error;
  }
};

export const getUserFromRecipe = async (recipeId: BigInt) => {
  try {
    const userId = await userQueries.getUserFromRecipe(recipeId);
    return userId[0].user_id;
  } catch (error) {
    logger(
      fileName,
      "getUserFromRecipe",
      `There was an error getting the user_id from the recipe ${recipeId}.`,
      error
    );
    throw error;
  }
};
