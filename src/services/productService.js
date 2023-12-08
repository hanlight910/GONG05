import ProductRepository from '../repositories/productRepository.js';

class ProductService {
	productRepository = new ProductRepository();
	create = async ({ title, description, userId, status }) => {
		const product = await this.productRepository.create({
			title,
			description,
			userId,
			status,
		});

		return product;
	};

	update = async (productId, userId, { title, description, status }) => {
		const existingProduct = await this.productRepository.findById(productId);
		if (!existingProduct) {
			const notFoundErr = new Error('해당 제품이 존재하지 않습니다.');
			notFoundErr.status = 404;
			throw notFoundErr
		}

		if (existingProduct.userId !== userId) {
			const errNoAuthority = new Error('해당 제품을 수정할 권한이 없습니다.');
			errNoAuthority.status = 403;
			throw errNoAuthority
		}

		const updatedProduct = await this.productRepository.update(productId, {
			title,
			description,
			status,
		});

		return updatedProduct;
	};

	delete = async (productId, userId) => {
		const existingProduct = await this.productRepository.findById(productId);
		const productInfo = await this.productRepository.findById(productId);
		if (!existingProduct) {
			const notFoundErr = new Error('해당 제품이 존재하지 않습니다.');
			notFoundErr.status = 404;
			throw notFoundErr
		}

		if (existingProduct.userId !== userId) {
			const errNoAuthority = new Error('해당 제품을 수정할 권한이 없습니다.');
			errNoAuthority.status = 403;
			throw errNoAuthority
		}
	
		await this.productRepository.delete(productId);
	};

	findAll = async (sort) => {
		const products = await this.productRepository.findAll(sort);
		return { products };
	};

	findById = async (productId) => {
		const productInfo = await this.productRepository.findById(productId);
		if (!productInfo) {
			const notFoundErr = new Error('해당 제품이 존재하지 않습니다.');
			notFoundErr.status = 404;
			throw notFoundErr
		}

		return {
			id: productInfo.id,
			title: productInfo.title,
			description: productInfo.description,
			status: productInfo.status,
			user: {
				name: productInfo.user.name,
			},
			createdAt: productInfo.createdAt,
		};
	};
}

export default ProductService;
