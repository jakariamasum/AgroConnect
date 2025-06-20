import { envConfig } from "@/config";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  role: string;
  email: string;
  name: string;
}
export const token_helper = {
  generateToken: ({ id, role, email, name }: TokenPayload) => {
    return jwt.sign({ id, role, email, name }, envConfig.jwt_secret as string, {
      expiresIn: "7d",
    });
  },

  verifyToken: (token: string) => {
    try {
      return jwt.verify(token, envConfig.jwt_secret as string) as TokenPayload;
    } catch (error) {
      console.error("Token verification failed:", error);
      return null;
    }
  },
};
