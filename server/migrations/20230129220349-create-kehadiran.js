'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable('kehadiran', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Users',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			hari_1: {
				type: DataTypes.ENUM('Hadir', 'Terlambat', 'Absen'),
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		});
	},
	async down(queryInterface, DataTypes) {
		await queryInterface.dropTable('kehadiran');
	},
};
