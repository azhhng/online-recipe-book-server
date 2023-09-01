import express, { Request, Response } from "express";
import * as recipeBoxController from "../controllers/recipeBoxController";
const router = express.Router();

// all routes with "/verified-user" go here

router.get("/recipe-box", async (req: Request, res: Response) => {
  try {
    const recipeBoxes =
      await recipeBoxController.getAllVerifiedUsersRecipeBoxes(req, res);
    return res.status(200).json(recipeBoxes);
  } catch (error) {
    return res
      .status(500)
      .json("There was an error getting recipe boxes for verified users.");
  }
});

export default router;
