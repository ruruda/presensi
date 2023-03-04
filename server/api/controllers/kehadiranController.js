const { Kehadiran } = require('../../models');
const registrationService = require('../services/registrations.service');
const kehadiranService = require('../services/kehadiran.service');
const cryptojs = require('crypto-js');

const getDate = () => {
	const date = new Date();
	return date.getDate();
};

const getTime = () => {
	return new Date().toLocaleTimeString();
};

const generateCode = (req, res, next) => {
	const date = getDate();
	const fieldName = `hari_${date}`;
	const key = process.env.CRYPTO_KEY;
	const encrypt = cryptojs.AES.encrypt(JSON.stringify(fieldName), key).toString();
	return res.status(200).json({ data: encrypt });
};

const updateKehadiran = async (req, res, next) => {
	const { code } = req.body;
	let statusHadir;
	try {
		const user = await registrationService.FindUserEmail(req.user.email);
		const bytes = cryptojs.AES.decrypt(code, process.env.CRYPTO_KEY);
		const decrypt = JSON.parse(bytes.toString(cryptojs.enc.Utf8));
		const time = getTime();

		time > '09:00:00' ? (statusHadir = 'Terlambat') : (statusHadir = 'Hadir');
		const existingPresensi = await Kehadiran.findOne({
			where: { userId: user.id },
		});

		if (existingPresensi && existingPresensi[decrypt] !== null)
			return res.status(400).json({ message: 'Anda sudah melakukan presensi' });

		await Kehadiran.update(
			{ [decrypt]: statusHadir },
			{ where: { userId: user.id } }
		);
		return res.status(200).json({ message: 'Berhasil melakukan presensi' });
	} catch (err) {
		if (err.message === 'Unexpected end of JSON input')
			return res.status(404).json({ message: 'Kode tidak valid' });
		return res.status(500).json({
			message: 'Something went wrong',
			serverMessage: err.message,
		});
	}
};

const getKehadiranById = async (req, res, next) => {
	const { uuid } = req.params;
	try {
		const data = await kehadiranService.GetKehadiranById(uuid);
		return res.status(200).json({
			message: `Get kehadiran ${uuid}`,
			data,
		});
	} catch (err) {
		return res.status(500).json({
			message: 'Something went wrong',
			serverMessage: err.message,
		});
	}
};

module.exports = {
	updateKehadiran,
	generateCode,
	getKehadiranById,
};
