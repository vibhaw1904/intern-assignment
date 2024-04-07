import Product from "../modal/ProductModal";
import { Request,Response } from "express";
import User from "../modal/UserModal";


export const createProducts = async (req: Request, res: Response) => {
    try {
        const { productName, description, price, expiryDate, category } = req.body;

        const userId = req.user?.id; 

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newProduct = await Product.create({
            productName,
            description,
            price,
            expiryDate,
            category,
            user: userId,
        });

        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getAllProducts=async(req:Request,res:Response)=>{
    let username = req.body.username;
    let category = req.body.category;
  
    try {
      let products;
  
      if (username) {
        products = await Product.find({ username: username });
      } else if (category) {
        products = await Product.find({ categories: category });
      } else {
        products = await Product.find({});
      }
  
      if (!products || products.length === 0) {
        return res.status(404).json({ message: 'No contents found' });
      }
  
      console.log(products);
      res.status(200).json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
}