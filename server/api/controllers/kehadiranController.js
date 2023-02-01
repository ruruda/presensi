const { Kehadiran } = require('../../models');
const registrationService = require('../services/registrations.service');

const updateKehadiran = async (req, res, next) => {
	try {
		const getUser = await registrationService.FindUserEmail(req.user.email);
		await Kehadiran.update(
			{ [req.body.fieldName]: req.body.statusHadir },
			{ where: { userId: getUser.id } }
		);
		return res.status(200).json({ message: 'Berhasil melakukan presensi' });
	} catch (err) {
		return res.status(500).json({
			message: 'Something went wrong',
			serverMessage: err,
		});
	}
};

module.exports = {
	updateKehadiran,
};
