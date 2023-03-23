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

const ResetKehadiranValue = async () => {
	let fieldToUpdate = {};
	for (let i = 1; i <= 31; i++) {
		let fieldName = `hari_${String(i).padStart(2, '0')}`;
		fieldToUpdate[fieldName] = null;
	}
	return await Kehadiran.update(fieldToUpdate, { where: {} });
};

module.exports = { GetKehadiran, GetKehadiranById, ResetKehadiranValue };
