const userService = require('../services/user.service');
const bcrypt = require('bcrypt');

const getUser = async (req, res, next) => {
	const { uuid } = req.params;
	try {
		const user = await userService.GetUserById(uuid);
		if (!user) return res.status(404).json({ message: 'User not found' });
		return res.status(200).json({ message: 'Get User succes', data: user });
	} catch (err) {
		return res.status(500).json({
			message: 'Something went wrong',
			serverMessage: err.message,
		});
	}
};

const updateUser = async (req, res, next) => {
	const { nopeg, name, email, password, confirmPassword, noHp, roleId } = req.body;
	const { uuid } = req.params;

	try {
		const user = await userService.GetUserById(uuid);
		if (!user) return res.status(404).json({ message: 'User not found' });
		if (user.uuid !== req.user.id)
			return res.status(403).json({ message: 'Editing another user is not permitted' });
		let hashPassword;
		if (password === '' || password === null) {
			hashPassword = user.password;
		} else {
			hashPassword = await bcrypt.hash(password, 10);
		}
		if (password !== confirmPassword)
			return res.status(400).json({ message: `Password and Confirm Password don't match` });
		await userService.UpdateUser({
			uuid: user.uuid,
			email,
			name,
			noHp,
			nopeg,
			password: hashPassword,
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
	getUser,
	updateUser,
};
