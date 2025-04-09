import jwt from 'jsonwebtoken';

const options = {
  expiresIn: "30d",
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_TOKEN, options);
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_TOKEN);
};

export {
  generateToken,
  verifyToken,
};