const userService = require('../services/user.service');

const getAllUsers = async (req, res, next) => {
	try {
		const users = await userService.GetAllUsers();
		return res.status(200).json({
			message: 'Get all users success',
			data: users,
		});
	} catch (err) {
		return res.status(500).json({
			message: 'Something went wrong',
			serverMessage: err,
		});
	}
};

module.exports = {
	getAllUsers,
};
