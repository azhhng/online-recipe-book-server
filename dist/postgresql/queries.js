"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
// configure .env variables
dotenv.config();
// configure database
const Pool = require("pg").Pool;
const pool = new Pool({
    user: process.env.POSTGRESQL_USER,
    host: process.env.POSTGRESQL_HOST,
    database: process.env.POSTGRESQL_DATABASE,
    password: process.env.POSTGRESQL_PASSWORD,
    port: process.env.POSTGRESQL_PORT,
});
const getAllUserRecipes = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield pool.query("SELECT * FROM recipe WHERE user_id=$1", [
        userId,
    ]);
    return response.rows;
});
const getAllUserRecipeBoxes = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield pool.query("SELECT * FROM recipe_box WHERE user_id=$1", [userId]);
    return response.rows;
});
const createRecipeBox = (userId, name, description) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield pool.query(`INSERT INTO "recipe_box" (user_id, recipe_box_id, name, description) VALUES ($1, nextval('recipe_box_id_sequence'), $2, $3) RETURNING *`, [userId, name, description]);
    return response.rows;
});
const createRecipe = (userId, name, link, description, has_made, favorite, recipe_box_id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield pool.query(`INSERT INTO "recipe" (recipe_id, user_id, name, link, description, has_made, favorite, recipe_box_id)
    VALUES (nextval('recipe_id_sequence'), $1, $2, $3, $4, $5, $6, $7) RETURNING *`, [userId, name, link, description, has_made, favorite, recipe_box_id]);
    return response.rows;
});
module.exports = {
    getAllUserRecipes,
    getAllUserRecipeBoxes,
    createRecipeBox,
    createRecipe,
};
