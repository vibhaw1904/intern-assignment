import mongoose, { Schema, Document } from 'mongoose';
export interface IProduct extends Document {
    productName: string;
    description: string;
    price: number;
    expiryDate?: Date; 
}

const productSchema: Schema = new Schema({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    expiryDate: { type: Date }, 
   
    category: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
