const { User } = require('../../models');

const GetAllUsers = async () => {
	return await User.findAll();
};

module.exports = {
	GetAllUsers,
};
