"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const ProductController_1 = require("../controller/ProductController");
const router = express_1.default.Router();
router.get('/', auth_1.protect, ProductController_1.getAllProducts);
router.post('/', auth_1.protect, ProductController_1.createProducts);
exports.default = router;
