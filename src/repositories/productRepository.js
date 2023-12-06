import prisma from '../utils/index.js';

class ProductRepository {
  static async create({ title, description, userId, status }) {
    return prisma.product.create({
      data: {
        title,
        description,
        userId,
        status,
      },
    });
  }

  static async findById(productId) {
    return prisma.product.findUnique({
      where: { id: productId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  static async update(productId, { title, description, status }) {
    return prisma.product.update({
      where: { id: productId },
      data: {
        title,
        description,
        status,
      },
    });
  }

  static async delete(productId) {
    return prisma.product.delete({
      where: { id: productId },
    });
  }

  static async findAll(sort) {
    return prisma.product.findMany({
      orderBy: { createdAt: sort.toUpperCase() === 'ASC' ? 'asc' : 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        createdAt: true,
        Auth: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}

export default ProductRepository;
