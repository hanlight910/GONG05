import prisma from '../utils/index.js';

class ProductRepository {
	create = async ({ title, description, userId, status }) => {
		return prisma.product.create({
			data: {
				title,
				description,
				userId,
				status,
			},
		});
	};

	findById = async (productId) => {
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
	};

	update = async (productId, { title, description, status }) => {
		return prisma.product.update({
			where: { id: productId },
			data: {
				title,
				description,
				status,
			},
		});
	};

	delete = async (productId) => {
		return prisma.product.delete({
			where: { id: productId },
		});
	};

	findAll = async (sort) => {
		return prisma.product.findMany({
			orderBy: { createdAt: sort.toUpperCase() === 'ASC' ? 'asc' : 'desc' },
			select: {
				id: true,
				title: true,
				description: true,
				status: true,
				createdAt: true,
				user: {
					select: {
						name: true,
					},
				},
			},
		});
	};
}

export default ProductRepository;
