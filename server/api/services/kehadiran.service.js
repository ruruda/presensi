const { Kehadiran, User } = require('../../models');

const GetKehadiran = async () => {
	return await Kehadiran.findAll({
		include: {
			model: User,
			as: 'user',
		},
	});
};

const GetKehadiranById = async (uuid) => {
	return await Kehadiran.findAll({
		include: {
			model: User,
			as: 'user',
			attributes: { exclude: ['roleId'] },
			where: { uuid: uuid },
		},
	});
};

module.exports = { GetKehadiran, GetKehadiranById };
