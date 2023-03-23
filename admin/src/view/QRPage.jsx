import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import QRCode from 'react-qr-code';

const QRPage = () => {
	const [code, setCode] = useState(localStorage.getItem('code') || '');
	const [loading, setLoading] = useState(false);
	const [lastRequestTime, setLastRequestTime] = useState(
		localStorage.getItem('lastRequestTime') || null
	);

	useEffect(() => {
		getQRCode();
	}, []);

	const getQRCode = async () => {
		const currentDate = new Date().getDate();

		if (currentDate !== parseInt(lastRequestTime)) {
			setLoading(true);
			try {
				const { data } = await axiosClient.get('/admin/qrcode');
				// console.log(data.data);
				localStorage.setItem('code', data.data);
				setCode(data.data);
				localStorage.setItem('lastRequestTime', currentDate);
				setLastRequestTime(currentDate);
				setLoading(false);
			} catch (err) {
				// console.log(err);
				setLoading(false);
			}
		}
	};

	const generateCode = async () => {
		try {
			const { data } = await axiosClient.get('/admin/qrcode');
			// console.log(data.data);
			localStorage.setItem('code', data.data);
			setCode(data.data);
			setLoading(false);
		} catch (err) {
			// console.log(err);
			setLoading(false);
		}
	};

	return (
		<div
			className="animated fadeInDown"
			style={{
				// outline: '1px solid salmon',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				height: '80vh',
				overflow: 'auto',
				alignItems: 'center',
			}}
		>
			<QRCode value={code} style={{ marginBottom: '6vh' }} />
			<input
				style={{ width: '500px' }}
				type="text"
				disabled={true}
				value={loading ? 'Loading...' : code}
				placeholder="Code Presensi"
			/>
			<button onClick={generateCode} className="btn-add" style={{ height: '40px' }}>
				Generate
			</button>
		</div>
	);
};

export default QRPage;
