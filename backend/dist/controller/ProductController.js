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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.createProducts = void 0;
const ProductModal_1 = __importDefault(require("../modal/ProductModal"));
const UserModal_1 = __importDefault(require("../modal/UserModal"));
const createProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { productName, description, price, expiryDate, category } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const user = yield UserModal_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newProduct = yield ProductModal_1.default.create({
            productName,
            description,
            price,
            expiryDate,
            category,
            user: userId,
        });
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    }
    catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createProducts = createProducts;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let username = req.body.username;
    let category = req.body.category;
    try {
        let products;
        if (username) {
            products = yield ProductModal_1.default.find({ username: username });
        }
        else if (category) {
            products = yield ProductModal_1.default.find({ categories: category });
        }
        else {
            products = yield ProductModal_1.default.find({});
        }
        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No contents found' });
        }
        console.log(products);
        res.status(200).json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllProducts = getAllProducts;
