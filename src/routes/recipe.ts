import express, { Request, Response } from "express";
const router = express.Router();
const userController = require("../controllers/userController");

// all routes with "/recipe" go here

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const recipe = await userController.putRecipe(req, res);
    return res.status(201).json(recipe);
  } catch (error) {
    return res.status(500).json("There was an error editing the recipe.");
  }
});
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const recipe = await userController.deleteRecipe(req, res);
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json("There was an error deleting the recipe.");
  }
});

module.exports = router;
