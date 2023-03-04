const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(' ')[1];
		jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
			if (err)
				return res.status(403).json({
					message: err.message,
				});
			req.user = user;
			next();
		});
	} else {
		res.sendStatus(401);
	}
};

const verifyUser = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.role === 'user' || req.user.role === 'admin') {
			next();
		} else {
			return res.status(403).json({ message: 'Not authorized' });
		}
	});
};

const verifyAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.role === 'admin') {
			next();
		} else {
			return res.status(403).json({ message: 'Not authorized' });
		}
	});
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
