import { logger } from "../logger";
const fileName = "recipe.ts";
const validateRecipeBody = (
  name: string,
  link: string,
  recipe_box_id: string
): void => {
  try {
    if (!name) {
      throw new Error(`Cannot create a recipe without a valid name.`);
    }
    if (!link) {
      throw new Error(`Cannot create a recipe without a valid link.`);
    }
    if (!recipe_box_id) {
      throw new Error(`Cannot create a recipe without a recipe box ID.`);
    }
  } catch (error) {
    logger(
      fileName,
      "validateRecipeBody",
      `There was an error validating a recipe body.`,
      error
    );
    throw error;
  }
};

export { validateRecipeBody };
