const bcrypt = require('bcrypt');
const registrationService = require('../services/resgistrations.service');

const create = async (req, res) => {
	const { nopeg, name, email, password, noHp, roleId } = req.body;
	const hashPassword = await bcrypt.hash(password, 10);
	try {
		if (!nopeg || !name || !email || !password || !noHp) {
			return res.status(400).json({
				message: 'All input is required',
			});
		}
		const userExists = await registrationService.FindUserEmail(email);
		if (userExists) {
			return res.status(409).json({
				message: 'Email already exists',
			});
		}
		const user = await registrationService.CreateUser({
			nopeg,
			name,
			email,
			password: hashPassword,
			noHp,
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
		return res.status(201).json({
			message: 'User has been created',
			data,
		});
	} catch (err) {
		return res.status(500).json({
			message: 'Something went wrong',
			serverMessage: err,
		});
	}
};

module.exports = {
	create,
};
