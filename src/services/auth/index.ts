/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "@/lib/prisma";
export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};

export const updateLastLogin = async (userId: string) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { lastLoginAt: new Date() },
  });
  return user;
};
