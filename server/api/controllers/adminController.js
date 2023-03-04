const userService = require('../services/user.service');
const registrationService = require('../services/registrations.service');
const kehadiranService = require('../services/kehadiran.service');
const bcrypt = require('bcrypt');
const token = require('../middleware/token');

const adminLogin = async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: 'All input is required' });
	}
	try {
		const user = await registrationService.FindUserEmail(email);
		if (!user) return res.status(401).json({ message: 'Incorrect email or password' });
		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword)
			return res.status(401).json({ message: 'Incorrect email or password' });
		if (user.dataValues.roleId !== 1)
			return res.status(403).json({ message: 'Not authorized' });
		const { accessToken, refreshToken } = await token.generateTokens(user);
		const role = await user.getRole();
		const userToken = {
			name: user.name,
			role: role.roles,
			accessToken,
			refreshToken,
		};
		return res.status(200).json({ message: 'Login success', data: userToken });
	} catch (err) {
		return res.status(500).json({
			message: 'Something went wrong',
			serverMessage: err.message,
		});
	}
};

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
			serverMessage: err.message,
		});
	}
};

const getAllKehadiran = async (req, res, next) => {
	try {
		const data = await kehadiranService.GetKehadiran();
		return res.status(200).json({
			message: 'Get all kehadiran',
			data,
		});
	} catch (err) {
		return res.status(500).json({
			message: 'Something went wrong',
			serverMessage: err.message,
		});
	}
};

const deleteUser = async (req, res, next) => {
	const { uuid } = req.params;
	try {
		await userService.DeleteUser(uuid);
		return res.status(200).json({
			success: 'true',
			message: 'User has been deleted',
		});
	} catch (err) {
		return res.status(500).json({
			message: 'Something went wrong',
			serverMessage: err.message,
		});
	}
};

module.exports = {
	adminLogin,
	getAllUsers,
	getAllKehadiran,
	deleteUser,
};
