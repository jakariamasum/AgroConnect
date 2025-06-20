export type TUser = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: "FARMER" | "BUYER" | "ADMIN";
  isVerified: boolean;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
};
