import express, { Request, Response } from "express";
const router = express.Router();
const userController = require("../controllers/userController");

// all routes with "/recipe" go here

router.put("/:id", async (req: Request, res: Response) => {
  const recipe = await userController.putRecipe(req, res);
  return res.status(201).json(recipe);
});
router.delete("/:id", async (req: Request, res: Response) => {
  const recipe = await userController.deleteRecipe(req, res);
  return res.status(200).json(recipe);
});

module.exports = router;
