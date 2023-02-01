const bcrypt = require('bcrypt');
const registrationService = require('../services/resgistrations.service');

const create = async (req, res) => {
	const { nopeg, name, email, password, noHp, roleId } = req.body;
	let hashPassword = null;
	if (password) {
		hashPassword = await bcrypt.hash(password, 10);
	}
	try {
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
		if (err.name === 'SequelizeValidationError')
			return res.status(400).json({
				message: err.errors.map((err) => err.message),
			});
		return res.status(500).json({
			message: 'Something went wrong',
			serverMessage: err,
		});
	}
};

const login = async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: 'All input is required' });
	}
	try {
		const user = await registrationService.FindUserEmail(email);
		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!user || !isValidPassword)
			return res.status(401).json({ message: 'Incorrect email or password' });
		return res.status(200).json({ message: 'Login success' });
	} catch (err) {
		return res.status(500).json({
			message: 'Something went wrong',
			serverMessage: err,
		});
	}
};

module.exports = {
	create,
	login,
};
