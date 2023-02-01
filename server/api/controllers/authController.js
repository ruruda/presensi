const bcrypt = require('bcrypt');
const registrationService = require('../services/registrations.service');
const token = require('../middleware/token');
const helpers = require('../helpers/jwtVerify');

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
		await registrationService.CreateKehadiran({ userId: user.id });
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
			serverMessage: err,
		});
	}
};

const getMe = async (req, res, next) => {
	// const token = req.headers.authorization.split(' ')[1];
	// try {
	// 	const decoded = helpers.verifyJwtAccess(token);
	// 	res.status(200).json(decoded);
	// } catch (error) {
	// 	return res.status(500).json(err);
	// }
	const { user } = req;
	const me = await registrationService.FindUserEmail(user.email);
	const role = await me.getRole();
	const { roleId, ...otherProps } = user;
	const data = { ...otherProps, role: role.roles };
	return res.status(200).json({
		success: true,
		data,
	});
};

const getRefresh = async (req, res) => {
	try {
		const { refreshTokens } = req.body;
		if (!refreshTokens) return res.sendStatus(401);
		const decoded = helpers.verifyJwtRefresh(refreshTokens);
		const user = await registrationService.FindUserEmail(decoded.email);
		const { accessToken, refreshToken } = await token.generateTokens(user);
		return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ success: false, error: error });
	}
};

module.exports = {
	create,
	login,
	getMe,
	getRefresh,
};
