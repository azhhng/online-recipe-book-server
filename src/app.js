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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const userController = require("./controllers/userController");
const app = (0, express_1.default)();
// configure .env variables
dotenv.config();
// configure cors
const allowedOrigins = ["http://localhost:3000"];
const options = {
    origin: allowedOrigins,
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.get("/test-get", (req, res) => {
    res.status(200).send("test get success");
});
app.get("/:user/recipe", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield userController.getAllUserRecipes(req, res);
    return res.json(recipes);
}));
app.get("/:user/recipe-box", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeBoxes = yield userController.getAllUserRecipeBoxes(req, res);
    return res.json(recipeBoxes);
}));
app.post("/:user/recipe-box", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeBox = yield userController.postUserRecipeBox(req, res);
    return res.json(recipeBox);
}));
app.use("/", (req, res) => {
    res.send("Hello world!");
});
app.listen(process.env.PORT_NUMBER, () => {
    console.log("Server is up on port:", process.env.PORT_NUMBER);
});
