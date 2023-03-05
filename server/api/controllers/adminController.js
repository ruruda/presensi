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

const adminUpdateUser = async (req, res, next) => {
	const { nopeg, name, email, password, confirmPassword, noHp, roleId } = req.body;
	const { uuid } = req.params;

	try {
		const user = await userService.GetUserById(uuid);
		if (!user) return res.status(404).json({ message: 'User not found' });
		let hashPassword;
		if (password === '' || password === null) {
			hashPassword = user.password;
		} else {
			hashPassword = await bcrypt.hash(password, 10);
		}
		if (password !== confirmPassword)
			return res.status(400).json({ message: "Password and Confirm Password don't match" });
		await userService.UpdateUser({
			uuid: user.uuid,
			email,
			name,
			noHp,
			nopeg,
			password: hashPassword,
			roleId,
		});
		const role = await user.getRole();
		const data = {
			nopeg,
			name,
			email,
			noHp,
			role: role.roles,
		};
		return res.status(200).json({ message: 'User has been updated', data });
	} catch (err) {
		if (err.name === 'SequelizeValidationError')
			return res.status(400).json({
				message: err.errors.map((err) => err.message),
			});
		return res.status(500).json({
			message: 'Something went wrong',
			serverMessage: err.message,
		});
	}
};

module.exports = {
	adminLogin,
	getAllUsers,
	deleteUser,
	adminUpdateUser,
	getAllKehadiran,
};
