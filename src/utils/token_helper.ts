import { envConfig } from "@/config";
import jwt from "jsonwebtoken";

export const token_helper = {
  generateToken: (userId: string, role: string) => {
    return jwt.sign({ userId, role }, envConfig.jwt_secret as string, {
      expiresIn: "7d",
    });
  },

  verifyToken: (token: string) => {
    try {
      return jwt.verify(token, envConfig.jwt_secret as string);
    } catch (error) {
      console.error("Token verification failed:", error);
      return null;
    }
  },
};
