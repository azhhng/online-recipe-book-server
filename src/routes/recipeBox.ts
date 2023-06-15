import express, { Request, Response } from "express";
const router = express.Router();
const userController = require("../controllers/userController");

// all routes with "/recipe-box" go here

router.put("/:box", async (req: Request, res: Response) => {
  const recipeBox = await userController.putRecipeBox(req, res);
  return res.json(recipeBox);
});

router.delete("/:box", async (req: Request, res: Response) => {
  const recipeBox = await userController.deleteRecipeBox(req, res);
  return res.json(recipeBox);
});

module.exports = router;