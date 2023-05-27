'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			nopeg: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			noHp: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			roleId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Roles',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
				defaultValue: 2,
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
		await queryInterface.dropTable('users');
	},
};
