import User from "../modal/UserModal";
import { Request,Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = (async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        
        if (!username || !email || !password) {
            res.status(400).json({ message: 'Please fill in all required fields' });
            return;
        }

       
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1d', 
        });

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            token,
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
     
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    
      res.status(200).json({ id: user._id, token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  export const updateUserDetails = async (req: Request, res: Response) => {
    try {
        const userId  = req.params.id;
        console.log('Received userId:', userId); 

        const { email, username, password } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.email = email;
        user.username = username;
        user.password = password;

        await user.save();

        res.json({ message: 'User details updated successfully' });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

  
  export const logoutUser=async(req: Request, res: Response) => {
    res.clearCookie('jwt'); 
    res.redirect('/login'); 
  }

