import * as queries from "../postgresql/transactionQueries";
import logger from "../logger";

const fileName = "userTransactionController.ts";

export const createUserTransactionRecipe = async (
  userId: string,
  recipeBoxId: BigInt,
  recipeId: BigInt,
  action: string
) => {
  try {
    const recipes = await queries.createUserTransactionRecipe(
      userId,
      recipeBoxId,
      recipeId,
      action
    );
    return recipes;
  } catch (error) {
    logger(
      fileName,
      "createUserTransactionRecipe",
      `There was an error creating a user transaction.`,
      error
    );
    throw error;
  }
};

export const createUserTransactionRecipeBox = async (
  userId: string,
  recipeBoxId: BigInt,
  action: string
) => {
  try {
    const recipes = await queries.createUserTransactionRecipeBox(
      userId,
      recipeBoxId,
      action
    );
    return recipes;
  } catch (error) {
    logger(
      fileName,
      "createUserTransactionRecipeBox",
      `There was an error creating a user transaction.`,
      error
    );
    throw error;
  }
};
