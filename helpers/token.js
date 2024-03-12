import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { TOKEN_SECRET} = process.env;

export const signupToken = (id) => {
  return jwt.sign({ id }, TOKEN_SECRET, { expiresIn: "23h" });
};

export const checkAuthToken = (token) => {
  const { id } = jwt.verify(token, TOKEN_SECRET);
  return id;
};
