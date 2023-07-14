import express, { Request, Response } from "express";
import * as recipeBoxController from "../controllers/recipeBoxController";
const router = express.Router();

// all routes with "/recipe-box" go here

router.put("/:box", async (req: Request, res: Response) => {
  try {
    const recipeBox = await recipeBoxController.putRecipeBox(req, res);
    return res.status(201).json(recipeBox);
  } catch (error) {
    return res.status(500).json("There was an error editing the recipe box.");
  }
});

router.get("/:box", async (req: Request, res: Response) => {
  try {
    const recipeBox = await recipeBoxController.getRecipeBox(req, res);
    return res.status(200).json(recipeBox);
  } catch (error) {
    return res.status(500).json("There was an error getting the recipe box.");
  }
});

router.delete("/:box", async (req: Request, res: Response) => {
  try {
    const recipeBox = await recipeBoxController.deleteRecipeBox(req, res);
    return res.status(200).json(recipeBox);
  } catch (error) {
    return res.status(500).json("There was an error deleting the recipe box.");
  }
});

router.get("/:box/recipes", async (req: Request, res: Response) => {
  try {
    const recipes = await recipeBoxController.getRecipeBoxRecipes(req, res);
    return res.status(200).json(recipes);
  } catch (error) {
    return res
      .status(500)
      .json("There was an error getting recipe box recipes.");
  }
});

export default router;
