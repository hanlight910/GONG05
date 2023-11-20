const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Auth = db.define('Auth', {
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: {
				msg: '이메일 형식이 맞지 않습니다',
			},
		},
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			len: [6, Infinity],
		},
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = Auth;
