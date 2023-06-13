import express, { Request, Response } from "express";
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/:user/recipe", async (req: Request, res: Response) => {
  const recipes = await userController.getAllUserRecipes(req, res);
  return res.json(recipes);
});

router.get("/:user/recipe-box", async (req: Request, res: Response) => {
  const recipeBoxes = await userController.getAllUserRecipeBoxes(req, res);
  return res.json(recipeBoxes);
});

router.post("/:user/recipe-box", async (req: Request, res: Response) => {
  const recipeBox = await userController.postUserRecipeBox(req, res);
  return res.json(recipeBox);
});

router.post("/:user/recipe", async (req: Request, res: Response) => {
  const recipe = await userController.postUserRecipe(req, res);
  return res.json(recipe);
});

router.delete("/:user", async (req: Request, res: Response) => {
  const response = await userController.deleteUser(req, res);
  return res.json(response);
});

module.exports = router;
