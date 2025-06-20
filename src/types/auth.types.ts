export type TUser = {
  id: string;
  email: string;
  name: string;
  role: "FARMER" | "BUYER" | "ADMIN";
  isVerified: boolean;
  avatar?: string;
};
