import logger from "../logger";
const fileName = "recipeBox.ts";
const validateRecipeBoxBody = (
  name: string,
  emoji: string,
  color: string
): void => {
  try {
    if (!name) {
      throw new Error(`Cannot create a recipe box without a valid name.`);
    }
    if (!emoji) {
      throw new Error(`Cannot create a recipe box without a valid emoji.`);
    }
    if (!color) {
      throw new Error(`Cannot create a recipe box without a valid color.`);
    }
  } catch (error) {
    logger(
      fileName,
      "validateRecipeBoxBody",
      `There was an error validating a recipe box body.`,
      error
    );
    throw error;
  }
};

export { validateRecipeBoxBody };
