import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../modal/UserModal'; 

interface JwtPayload {
  id: string,

}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET ||"abcdef") as JwtPayload; 
      req.user = await User.findById(decoded.id).select('-password');
      next();
    }
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};
