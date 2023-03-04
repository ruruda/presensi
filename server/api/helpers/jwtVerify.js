const jwt = require('jsonwebtoken');

const jwtSignAccess = (payload) => {
	return jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {
		expiresIn: '1d',
	});
};

const jwtSignRefresh = (payload) => {
	return jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, {
		expiresIn: '7d',
	});
};

const verifyJwtAccess = (token) => {
	return jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
};

const verifyJwtRefresh = (token) => {
	return jwt.verify(token, process.env.SECRET_REFRESH_TOKEN);
};

module.exports = {
	jwtSignAccess,
	jwtSignRefresh,
	verifyJwtAccess,
	verifyJwtRefresh,
};
