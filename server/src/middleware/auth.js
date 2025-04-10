import {verifyToken} from '../service/jwt.js'

const getUserFromJwtToken = async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader.split(" ")[1];
  
      if (!token)
        return res.status(401).json({ message: "Access missing or invalid." });
  
      const decoded = verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Access missing or invalid." });
    }
  };
  export {
    getUserFromJwtToken
  };  