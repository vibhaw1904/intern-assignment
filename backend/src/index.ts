import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import UserRoutes from './routes/UserRoutes'; 
import ProductRoutes from './routes/ProductRoutes'
import { connectDb } from './db/connect'; 

import * as dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;
console.log(PORT)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDb(); 


app.use('/user', UserRoutes); 
app.use('/product', ProductRoutes); 



app.listen(PORT, () => {
  console.log(`🗄️  Server is running on http://localhost:${PORT}`);
});
