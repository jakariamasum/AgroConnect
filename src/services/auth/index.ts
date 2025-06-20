/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createUser = async (user: any) => {
  const newUser = prisma.user.create({
    data: user,
  });
  return newUser;
};
