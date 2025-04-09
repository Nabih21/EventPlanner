import bcrypt from 'bcrypt'; 

const hashPassword = async (plainText) => {
  return await bcrypt.hash(plainText, parseInt(process.env.saltRounds));
};

const verifyPassword = async (plainText, hashedText) => {
  return await bcrypt.compare(plainText, hashedText);
};

export {
  hashPassword,
  verifyPassword,
};