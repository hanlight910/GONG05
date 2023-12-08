import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/userRepository.js';
const secretKey = process.env.JWT_SECRET;

class UserService {
	static async signUp({ email, password, confirmPassword, name }) {
		const existingUser = await UserRepository.findByEmail(email);

		if (existingUser) {
			const errEmailDuplicated = new Error('해당 이메일이 이미 사용 중입니다.');
			errEmailDuplicated.status = 401
			throw errEmailDuplicated
		}

		if (password.length < 6) {
			const errPasswordDigit6 = new Error('비밀번호가 6자리 이상이어야 합니다.');
			errPasswordDigit6.status = 401
			throw errPasswordDigit6
		}

		if (password !== confirmPassword) {
			const errPasswordMatch = new Error('패스워드가 서로 동일하지 않습니다.');
			errPasswordMatch.status = 401;
			throw errPasswordDontMatch
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await UserRepository.createUser({
			email,
			password: hashedPassword,
			name,
		});

		return {
			id: user.id,
			email: user.email,
			name: user.name,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};
	}

	static async login({ email, password }) {
		const user = await UserRepository.findByEmail(email);
		if (!user) {
			const errEmailNotExisted = new Error('해당 이메일이 존재하지 않습니다.');
			errEmailNotExisted.status = 404;
			throw new errEmailNotExisted
		}

		const matchPassword = await bcrypt.compare(password, user.password);
		if (!matchPassword) {
			const errPasswordNotEqual = new Error('비밀번호가 일치하지 않습니다.');
			errPasswordNotEqual.status = 401;
			throw errPasswordNotEqual
		}

		const accessToken = jwt.sign({ userId: user.id }, secretKey, {
			expiresIn: '12h',
		});

		return { accessToken };
	}

	static async getUser(userId) {
		const user = await UserRepository.findById(userId);

		if (!user) {
			const errUserNotExist = new Error('유저를 찾을 수 없습니다.');
			errUserNotExist.status = 404;
			throw new errUserNotExist
		}

		return { user };
	}
}

export default UserService;
