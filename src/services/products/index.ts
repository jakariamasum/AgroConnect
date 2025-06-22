import { Product } from "@/generated/prisma";
import prisma from "@/lib/prisma";

export const createProduct = async (data: Product) => {
  return await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      farmerId: data.farmerId,
      categoryId: data.categoryId,
      description: data.description || null,
      shortDescription: data.shortDescription || null,
      price: Number(data.price),
      stock: Number(data.stock),
      minStock: Number(data.minStock),
      weight: Number(data.weight) || null,
      unit: data.unit || "kg",
      images: data.images,
      tags: data.tags || [],
      certifications: data.certifications || [],
      isFeature: data.isFeature || false,
      status: data.status || "ACTIVE",
      isOrganic: data.isOrganic || false,
    },
  });
};

export const getProducts = async () => {
  return await prisma.product.findMany({
    include: {
      farmer: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProductById = async (id: string) => {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      farmer: true,
      category: true,
    },
  });
};

export const updateProduct = async (id: string, data: Partial<Product>) => {
  return await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      slug: data.slug,
      farmerId: data.farmerId,
      categoryId: data.categoryId,
      description: data.description || null,
      shortDescription: data.shortDescription || null,
      price: Number(data.price),
      stock: Number(data.stock),
      minStock: Number(data.minStock),
      weight: Number(data.weight) || null,
      unit: data.unit || "kg",
      images: data.images,
      tags: data.tags || [],
      certifications: data.certifications || [],
      isFeature: data.isFeature || false,
      status: data.status || "ACTIVE",
      isOrganic: data.isOrganic || false,
    },
  });
};

export const deleteProduct = async (id: string) => {
  return await prisma.product.delete({
    where: { id },
  });
};

export const getProductsByFarmerId = async (farmerId: string) => {
  return await prisma.product.findMany({
    where: { farmerId },
    include: {
      farmer: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProductsByCategoryId = async (categoryId: string) => {
  return await prisma.product.findMany({
    where: { categoryId },
    include: {
      farmer: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const searchProducts = async (query: string) => {
  return await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { tags: { hasSome: [query] } },
      ],
    },
    include: {
      farmer: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
