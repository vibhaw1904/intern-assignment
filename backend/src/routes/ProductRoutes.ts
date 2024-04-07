import express from "express"
import { protect } from "../middleware/auth";
import { createProducts, getAllProducts } from "../controller/ProductController";
const router=express.Router();

router.get('/',protect,getAllProducts);
router.post('/',protect,createProducts);

export default router;