import express, { Request, Response } from "express";
const router = express.Router();
const userController = require("../controllers/userController");

// all routes with "/recipe-box" go here

router.put("/:box", async (req: Request, res: Response) => {
  try {
    const recipeBox = await userController.putRecipeBox(req, res);
    return res.status(201).json(recipeBox);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/:box", async (req: Request, res: Response) => {
  try {
    const recipeBox = await userController.deleteRecipeBox(req, res);
    return res.status(200).json(recipeBox);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
