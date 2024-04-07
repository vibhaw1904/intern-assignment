import mongoose from 'mongoose';

export const connectDb = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI ?? 'mongodb://localhost:27017/mydb'; 
    const connect = await mongoose.connect(uri);
    console.log(`DB IS CONNECTED ${connect.connection.host}`);
  } catch (error) {
    console.error('Server is NOT connected to Database:');
    process.exit(1);
  }
};
