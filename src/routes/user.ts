import express, { Request, Response } from "express";
const router = express.Router();
const userController = require("../controllers/userController");

// get user information from the database
router.get("/:user", async (req: Request, res: Response) => {
  const user = await userController.getUser(req, res);
  return res.status(200).json(user);
});

// get user information from Auth0
router.get("/:user/auth0", async (req: Request, res: Response) => {
  const user = await userController.getUserAuth0(req, res);
  return res.status(200).json(user);
});

router.post("/:user", async (req: Request, res: Response) => {
  const user = await userController.createUser(req, res);
  return res.status(201).json(user);
});

router.put("/:user", async (req: Request, res: Response) => {
  const user = await userController.putUser(req, res);
  return res.status(201).json(user);
});

router.delete("/:user", async (req: Request, res: Response) => {
  const user = await userController.deleteUser(req, res);
  return res.status(200).json(user);
});

router.get("/:user/recipe", async (req: Request, res: Response) => {
  const recipes = await userController.getAllUserRecipes(req, res);
  return res.status(200).json(recipes);
});

router.get("/:user/recipe-box", async (req: Request, res: Response) => {
  const recipeBoxes = await userController.getAllUserRecipeBoxes(req, res);
  return res.status(200).json(recipeBoxes);
});

router.post("/:user/recipe-box", async (req: Request, res: Response) => {
  const recipeBox = await userController.postUserRecipeBox(req, res);
  return res.status(201).json(recipeBox);
});

router.post("/:user/recipe", async (req: Request, res: Response) => {
  const recipe = await userController.postUserRecipe(req, res);
  return res.status(201).json(recipe);
});

module.exports = router;
