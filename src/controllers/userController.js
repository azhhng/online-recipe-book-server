"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const queries = require("../postgresql/queries");
exports.getAllUserRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield queries.getAllUserRecipes(req.params.user);
    return recipes;
});
exports.getAllUserRecipeBoxes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeBoxes = yield queries.getAllUserRecipeBoxes(req.params.user);
    return recipeBoxes;
});
exports.postUserRecipeBox = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.params.user;
    const { name, description } = req.body;
    const recipeBox = yield queries.createRecipeBox(user_id, name, description);
    return recipeBox;
});
exports.postUserRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.params.user;
    const { name, link, description, has_made, favorite, recipe_box_id } = req.body;
    const recipeBox = yield queries.createRecipe(user_id, name, link, description, has_made, favorite, recipe_box_id);
    return recipeBox;
});
