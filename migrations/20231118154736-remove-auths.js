'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('Auths', 'name');
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn('Auths', 'name', {
			type: Sequelize.STRING,
			allowNull: true,
		});
	},
};
