const { User, Kehadiran } = require('../../models');

const FindUserEmail = async (email) => {
	return await User.findOne({ where: { email: email } });
};

const CreateUser = async ({ nopeg, name, email, password, noHp, roleId }) => {
	return await User.create(
		{
			nopeg,
			name,
			email,
			password,
			noHp,
			roleId,
		},
		{ validate: true }
	);
};

const CreateKehadiran = async ({ userId }) => {
	return await Kehadiran.create({ userId }, { validate: true });
};

module.exports = {
	FindUserEmail,
	CreateUser,
	CreateKehadiran,
};
