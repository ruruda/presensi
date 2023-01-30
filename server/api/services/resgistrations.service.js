const { User } = require('../../models');

const FindUserEmail = async (email) => {
	return await User.findOne({
		where: {
			email: email,
		},
	});
};

const CreateUser = async ({ nopeg, name, email, password, noHp, roleId }) => {
	return await User.create({
		nopeg,
		name,
		email,
		password,
		noHp,
		roleId,
	});
};

module.exports = {
	FindUserEmail,
	CreateUser,
};
