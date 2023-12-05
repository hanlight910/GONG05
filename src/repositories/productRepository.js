import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ProductRepository {
  static getAllProducts() {
    return prisma.product.findMany();
  }

  static getProductById(productId) {
    return prisma.product.findUnique({
      where: { id: productId },
    });
  }

  static createProduct(productData) {
    return prisma.product.create({
      data: productData,
    });
  }
}

export default ProductRepository;
