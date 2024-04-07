import mongoose from "mongoose";

interface IUser{
    username: string;
    email: string;
    password: string;
    products:[];
  }

const userSchema=new mongoose.Schema<IUser>({
  username: { type: String, required: true ,trim:true,},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  ],
})
  

const User = mongoose.model<IUser>('User', userSchema);

export default User;