import express, { Request, Response } from "express";
import * as recipeController from "../controllers/recipeController";
const router = express.Router();

// all routes with "/recipe" go here
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const recipe = await recipeController.putRecipe(req, res);
    return res.status(201).json(recipe);
  } catch (error) {
    return res.status(500).json("There was an error editing the recipe.");
  }
});
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const recipe = await recipeController.deleteRecipe(req, res);
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json("There was an error deleting the recipe.");
  }
});

export default router;
