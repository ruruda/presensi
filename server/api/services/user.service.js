const { where } = require('sequelize');
const { User } = require('../../models');

const GetAllUsers = async () => {
	return await User.findAll();
};

const DeleteUser = async (uuid) => {
	return await User.destroy({ where: { uuid: uuid } });
};

const GetUserById = async (uuid) => {
	return await User.findOne({ where: { uuid: uuid } });
};

const UpdateUser = async ({ uuid, nopeg, name, email, password, noHp }) => {
	return await User.update(
		{
			nopeg,
			name,
			email,
			password,
			noHp,
		},
		{ where: { uuid: uuid }, validate: true }
	);
};

module.exports = {
	GetAllUsers,
	DeleteUser,
	GetUserById,
	UpdateUser,
};
