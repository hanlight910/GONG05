require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const authenticateToken = require('../middleware/authMiddleware');

const { check, validationResult } = require('express-validator');
const Auth = require('../models/authModel');

router.post(
	'/signup',
	[check('email').isEmail().withMessage('올바른 이메일 형식이 아닙니다.')],
	async (req, res) => {
		try {
			const { email, password, confirmPassword, username } = req.body;

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const existingUser = await Auth.findOne({
				where: {
					[Op.or]: [{ email: email }, { username: username }],
				},
			});

			if (existingUser) {
				return res
					.status(400)
					.json({ error: 'email이나 username이 이미 사용 중입니다.' });
			}

			if (password.length < 6) {
				return res
					.status(400)
					.json({ error: '비밀번호가 6자리 이상이어야 합니다.' });
			}

			if (password !== confirmPassword) {
				return res.status(400).json({ error: '패스워드가 동일하지 않습니다.' });
			}
			const hashedPassword = await bcrypt.hash(password, 10);

			const user = await Auth.create({
				email,
				password: hashedPassword,
				username,
			});

			const responseUser = {
				id: user.id,
				email: user.email,
				username: user.username,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			};

			res.status(201).json({ message: '회원가입 성공!', user: responseUser });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: '서버 에러' });
		}
	},
);

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await Auth.findOne({ where: { email: email } });

		if (!user) {
			return res.status(404).json({ error: '해당 email이 존재하지 않습니다.' });
		}

		const matchPassword = await bcrypt.compare(password, user.password);

		if (!matchPassword) {
			return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
		}

		const accessToken = jwt.sign({ userId: user.id }, secretKey, {
			expiresIn: '12h',
		});

		res.json({ accessToken });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: '서버 에러' });
	}
});

router.get('/user', authenticateToken, async (req, res) => {
	try {
		const user = await Auth.findByPk(req.locals.user.userId, {
			attributes: { exclude: 'password' },
		});

		if (!user) {
			console.log(req.locals.user.userId);
			return res.status(404).json({ error: '유저를 찾을 수 없습니다.' });
		}

		res.json({ user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: '서버 오류' });
	}
});

module.exports = router;
