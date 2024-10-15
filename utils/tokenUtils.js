import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

//Auth controller collected this
// const token = createJWT({ userId: user._id, role: user.role });
//This gets sent to authmiddleware

//Server decodes this for you//This attaches to the cookie
