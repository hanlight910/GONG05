import UserService from '../services/userService.js';

class UserController {
	static signUp = async (req, res, next) => {
		try {
			const { email, password, confirmPassword, name } = req.body;

			const responseUser = await UserService.signUp({
				email,
				password,
				confirmPassword,
				name,
			});

			res.status(201).json({ message: '회원가입 성공!', user: responseUser });
		} catch (error) {
			next(error);
		}
	};

	static async login(req, res) {
		try {
			const { email, password } = req.body;

			const responseToken = await UserService.login({ email, password });

			res.json(responseToken);
		} catch (error) {
			console.error(error);
			next(error);
		}
	}

	static async getUser(req, res) {
		try {
			const responseUser = await UserService.getUser(req.user.userId);

			res.json({ responseUser });
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
}

export default UserController;
