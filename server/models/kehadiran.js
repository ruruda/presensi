'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Kehadiran extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User }) {
			// define association here
			this.belongsTo(User, { as: 'user', foreignKey: 'userId' });
		}
		toJSON() {
			return {
				...this.get(),
				id: undefined,
				userId: undefined,
				createdAt: undefined,
				updatedAt: undefined,
			};
		}
	}
	Kehadiran.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			hari_1: DataTypes.ENUM('Hadir', 'Terlambat', 'Absen'),
			hari_2: DataTypes.ENUM('Hadir', 'Terlambat', 'Absen'),
			hari_3: DataTypes.ENUM('Hadir', 'Terlambat', 'Absen'),
			hari_4: DataTypes.ENUM('Hadir', 'Terlambat', 'Absen'),
			hari_5: DataTypes.ENUM('Hadir', 'Terlambat', 'Absen'),
		},
		{
			sequelize,
			modelName: 'Kehadiran',
			tableName: 'kehadiran',
		}
	);
	return Kehadiran;
};
