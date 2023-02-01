const { Kehadiran } = require('../../models');
const registrationService = require('../services/registrations.service');

const updateKehadiran = async (req, res, next) => {
	try {
		const getUser = await registrationService.FindUserEmail(req.user.email);
		await Kehadiran.update(
			{ [req.body.fieldName]: [req.body.statusHadir] },
			{ where: { userId: getUser.id } }
		);
		return res.json('Success');
	} catch (err) {
		return res.json(err);
	}
};

module.exports = {
	updateKehadiran,
};
