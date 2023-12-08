import ProductService from '../services/productService.js';

class ProductController {
	productService = new ProductService();
	create = async (req, res, next) => {
		try {
			const { title, description } = req.body;

			const userId = req.user.userId;
			await this.productService.create({
				title,
				description,
				userId,
				status: 'FOR_SALE',
			});

			res.status(201).json({ message: '상품을 생성하는데 성공하였습니다' });
		} catch (error) {
			next(error);
		}
	};

	update = async (req, res, next) => {
		try {
			const { title, description, status } = req.body;
			const { productId } = req.params;

			await this.productService.update(Number(productId), req.user.userId ,{
				title,
				description,
				status,
			});

			res.status(201).json({ message: '상품을 수정하는데 성공하였습니다' });
		} catch (error) {
			next(error);
		}
	};

	delete = async (req, res, next) => {
		try {
			const { productId } = req.params;

			await this.productService.delete(Number(productId), req.user.userId);

			res.json({ message: '상품이 성공적으로 삭제되었습니다.' });
		} catch (error) {
			next(error);
		}
	};

	findAll = async (req, res, next) => {
		try {
			const { sort } = req.query;

			const response = await this.productService.findAll(sort);

			res.json(response);
		} catch (error) {
			next(error);
		}
	};

	findById = async (req, res, next) => {
		try {
			const { productId } = req.params;

			const responseProduct = await this.productService.findById(
				Number(productId),
			);

			res.json(responseProduct);
		} catch (error) {
			next(error);
		}
	};
}

export default ProductController;
