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
