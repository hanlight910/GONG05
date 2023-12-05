import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return prisma.product.findMany();
};

export const getProductById = async (productId) => {
  return prisma.product.findUnique({
    where: { id: productId },
  });
};

export const createProduct = async (productData) => {
  return prisma.product.create({
    data: productData,
  });
};
