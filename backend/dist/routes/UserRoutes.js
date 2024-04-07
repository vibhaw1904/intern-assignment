"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const UserController_1 = require("../controller/UserController");
const router = express_1.default.Router();
router.post('/signup', UserController_1.registerUser);
router.post('/signin', auth_1.protect, UserController_1.login);
router.put('/update/:id', auth_1.protect, UserController_1.updateUserDetails);
router.post('/logout', auth_1.protect, UserController_1.logoutUser);
exports.default = router;
