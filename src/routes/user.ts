import express, { Request, Response } from "express";
import * as userController from "../controllers/userController";
import * as recipeController from "../controllers/recipeController";
import * as recipeBoxController from "../controllers/recipeBoxController";

const router = express.Router();

// all routes with "/user" go here

// get user information from the database
router.get("/:user", async (req: Request, res: Response) => {
  try {
    const user = await userController.getUser(req, res);
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json(
        "There was an error getting the user's information from the database."
      );
  }
});

// get user information from Auth0
router.get("/:user/auth0", async (req: Request, res: Response) => {
  try {
    const user = await userController.getUserAuth0(req, res);
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json("There was an error getting the user's information from Auth0.");
  }
});

router.post("/:user", async (req: Request, res: Response) => {
  try {
    const user = await userController.createUser(req, res);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json("There was an error creating the user.");
  }
});

router.put("/:user", async (req: Request, res: Response) => {
  try {
    const user = await userController.putUser(req, res);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json("There was an error editing the user.");
  }
});

router.delete("/:user", async (req: Request, res: Response) => {
  try {
    const user = await userController.deleteUser(req, res);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("There was a problem deleting the user.");
  }
});

router.get("/:user/recipe", async (req: Request, res: Response) => {
  try {
    const recipes = await recipeController.getAllUserRecipes(req, res);
    return res.status(200).json(recipes);
  } catch (error) {
    return res.status(500).json("There was an error getting recipes.");
  }
});

router.get("/:user/recipe-box", async (req: Request, res: Response) => {
  try {
    const recipeBoxes = await recipeBoxController.getAllUserRecipeBoxes(
      req,
      res
    );
    return res.status(200).json(recipeBoxes);
  } catch (error) {
    return res.status(500).json("There was an error getting recipe boxes.");
  }
});

router.post("/:user/recipe-box", async (req: Request, res: Response) => {
  try {
    const recipeBox = await recipeBoxController.postRecipeBox(req, res);
    return res.status(201).json(recipeBox);
  } catch (error) {
    return res.status(500).json("There was an error creating a recipe box.");
  }
});

router.post("/:user/recipe", async (req: Request, res: Response) => {
  try {
    const recipe = await recipeController.postRecipe(req, res);
    return res.status(201).json(recipe);
  } catch (error) {
    return res.status(500).json("There was an error adding a recipe.");
  }
});

export default router;
