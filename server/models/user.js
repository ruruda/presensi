'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Role, RefreshToken, Kehadiran }) {
			// define association here
			this.belongsTo(Role, {
				foreignKey: 'roleId',
				as: 'role',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
				hooks: true,
			});

			this.hasOne(RefreshToken, {
				foreignKey: 'userId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
				hooks: true,
			});

			this.hasOne(Kehadiran, {
				foreignKey: 'userId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
				hooks: true,
			});
		}

		toJSON() {
			return {
				...this.get(),
				id: undefined,
				password: undefined,
				createdAt: undefined,
				updatedAt: undefined,
			};
		}
	}
	User.init(
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			nopeg: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notNull: {
						msg: 'No Pegawai is required',
					},
					notEmpty: {
						msg: 'No pegawai is required',
					},
				},
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Name is required',
					},
					notEmpty: {
						msg: 'Name is required',
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
					notNull: {
						msg: 'Email is required',
					},
					notEmpty: {
						msg: 'Email is required',
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Password is required',
					},
					notEmpty: {
						msg: 'Password is required',
					},
				},
			},
			noHp: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'No Hp is required',
					},
					notEmpty: {
						msg: 'No Hp is required',
					},
				},
			},
			roleId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 2,
				validate: {
					notNull: {
						msg: 'Role is required',
					},
					notEmpty: {
						msg: 'Role is required',
					},
				},
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
