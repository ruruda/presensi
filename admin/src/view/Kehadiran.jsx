import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

const Kehadiran = () => {
	const [kehadiran, setKehadiran] = useState([]);
	const [loading, setLoading] = useState(false);
	const [date, setDate] = useState();
	const { setNotification } = useStateContext();

	useEffect(() => {
		getKehadiran();
		getDate();
	}, []);

	// console.log(kehadiran);

	const getKehadiran = async () => {
		setLoading(true);
		try {
			const { data } = await axiosClient.get('/admin/kehadiran');
			setKehadiran(data.data);
			setLoading(false);
		} catch (err) {
			setLoading(false);
		}
	};

	const getDate = () => {
		const currentDate = new Date().toLocaleString('id-ID', {
			month: 'long',
			year: 'numeric',
		});
		setDate(currentDate);
	};

	const onReset = () => {
		if (!window.confirm('Are you sure want to delete kehadiran?')) {
			return;
		}
		axiosClient.put('/admin/kehadiran/reset').then(() => {
			setNotification('Kehadiran successfully reset');
			getKehadiran();
		});
	};

	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<h1>Kehadiran: {date}</h1>
				<button onClick={() => onReset()} className="btn-delete">
					Reset
				</button>
			</div>
			<div className="card animated fadeInDown">
				<table className="table-kehadiran">
					<thead>
						<tr>
							<th>No Pegawai</th>
							<th>Nama</th>
							{[...Array(31)].map((_, i) => (
								<th key={i}>{(i + 1).toString().padStart(2, '0')}</th>
							))}
						</tr>
					</thead>
					{loading && (
						<tbody>
							<tr>
								<td colSpan="5" className="text-center">
									Loading...
								</td>
							</tr>
						</tbody>
					)}
					{!loading && (
						<tbody>
							{kehadiran.map((k, i) => (
								<tr key={i}>
									<td style={{ fontWeight: 'normal', textAlign: 'left' }}>{k.user.nopeg}</td>
									<td style={{ fontWeight: 'normal', textAlign: 'left' }}>{k.user.name}</td>
									{[...Array(31)].map((_, i) => (
										<td key={i}>{k[`hari_${(i + 1).toString().padStart(2, '0')}`]}</td>
									))}
								</tr>
							))}
						</tbody>
					)}
				</table>
			</div>
		</div>
	);
};

export default Kehadiran;
