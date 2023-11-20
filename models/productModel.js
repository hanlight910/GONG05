const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Auth = require('./authModel');

const Product = db.define('Product', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	content: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.ENUM('FOR_SALE', 'SOLD_OUT'),
		defaultValue: 'FOR_SALE',
	},
});

Product.belongsTo(Auth, { foreignKey: 'userId' });

module.exports = Product;
