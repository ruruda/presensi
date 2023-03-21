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
			hari_01: DataTypes.ENUM('H', 'TL', 'A'),
			hari_02: DataTypes.ENUM('H', 'TL', 'A'),
			hari_03: DataTypes.ENUM('H', 'TL', 'A'),
			hari_04: DataTypes.ENUM('H', 'TL', 'A'),
			hari_05: DataTypes.ENUM('H', 'TL', 'A'),
			hari_06: DataTypes.ENUM('H', 'TL', 'A'),
			hari_07: DataTypes.ENUM('H', 'TL', 'A'),
			hari_08: DataTypes.ENUM('H', 'TL', 'A'),
			hari_09: DataTypes.ENUM('H', 'TL', 'A'),
			hari_10: DataTypes.ENUM('H', 'TL', 'A'),
			hari_11: DataTypes.ENUM('H', 'TL', 'A'),
			hari_12: DataTypes.ENUM('H', 'TL', 'A'),
			hari_13: DataTypes.ENUM('H', 'TL', 'A'),
			hari_14: DataTypes.ENUM('H', 'TL', 'A'),
			hari_15: DataTypes.ENUM('H', 'TL', 'A'),
			hari_16: DataTypes.ENUM('H', 'TL', 'A'),
			hari_17: DataTypes.ENUM('H', 'TL', 'A'),
			hari_18: DataTypes.ENUM('H', 'TL', 'A'),
			hari_19: DataTypes.ENUM('H', 'TL', 'A'),
			hari_20: DataTypes.ENUM('H', 'TL', 'A'),
			hari_21: DataTypes.ENUM('H', 'TL', 'A'),
			hari_22: DataTypes.ENUM('H', 'TL', 'A'),
			hari_23: DataTypes.ENUM('H', 'TL', 'A'),
			hari_24: DataTypes.ENUM('H', 'TL', 'A'),
			hari_25: DataTypes.ENUM('H', 'TL', 'A'),
			hari_26: DataTypes.ENUM('H', 'TL', 'A'),
			hari_27: DataTypes.ENUM('H', 'TL', 'A'),
			hari_28: DataTypes.ENUM('H', 'TL', 'A'),
			hari_29: DataTypes.ENUM('H', 'TL', 'A'),
			hari_30: DataTypes.ENUM('H', 'TL', 'A'),
			hari_31: DataTypes.ENUM('H', 'TL', 'A'),
		},
		{
			sequelize,
			modelName: 'Kehadiran',
			tableName: 'kehadiran',
		}
	);
	return Kehadiran;
};
