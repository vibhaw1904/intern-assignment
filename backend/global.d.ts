namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      MONGO_URI: string;
      JWT_SECRET:string;
    }
  }
 namespace Express {
    interface Request {
      user?: Record<string, any>; 
    }
  }