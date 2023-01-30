'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class RefreshToken extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User }) {
			// define association here
			this.belongsTo(User, { foreignKey: 'userId' });
		}

		toJSON() {
			return {
				...this.get(),
				id: undefined,
				createdAt: undefined,
				updatedAt: undefined,
			};
		}
	}
	RefreshToken.init(
		{
			userId: DataTypes.INTEGER,
			token: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'RefreshToken',
		}
	);
	return RefreshToken;
};
