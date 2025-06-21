/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from "@/generated/prisma";
import prisma from "@/lib/prisma";

export const createCategory = async (category: Category) => {
  return await prisma.category.create({
    data: {
      name: category.name,
      slug: category.slug,
      description: category.description,
      image: category.image,
      parentId: category?.parentId || null,
      sortOrder: Number(category.sortOrder) || 0,
    },
  });
};

export const getCategories = async (filters: {
  search?: string;
  parentId?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}) => {
  const { search, parentId, isActive, page = 1, limit = 10 } = filters;

  const where: any = {};
  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }
  if (parentId) {
    where.parentId = parentId;
  }
  if (isActive !== undefined) {
    where.isActive = isActive;
  }

  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { sortOrder: "asc" },
    }),
    prisma.category.count({ where }),
  ]);

  return {
    data: categories,
    total,
    page,
    limit,
  };
};
