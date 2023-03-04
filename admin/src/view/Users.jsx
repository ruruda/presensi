import React, { useState } from 'react';
import { useEffect } from 'react';
import axiosClient from '../axios-client.js';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider.jsx';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const { setNotification } = useStateContext();
	useEffect(() => {
		getUsers();
	}, []);

	const onDelete = (user) => {
		if (!window.confirm('Are you sure want to delete this user?')) {
			return;
		}
		axiosClient.delete(`/admin/user/${user.uuid}`).then(() => {
			setNotification('User was successfully deleted');
			getUsers();
		});
	};

	const getUsers = async () => {
		setLoading(true);
		try {
			const { data } = await axiosClient.get('/admin/users');
			setUsers(data.data);
			setLoading(false);
		} catch (err) {
			setLoading(false);
		}
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
				<h1>Users</h1>
				<Link to="/users/new" className="btn-add">
					Add new
				</Link>
			</div>
			<div className="card animated fadeInDown">
				<table>
					<thead>
						<tr>
							<th>No Pegawai</th>
							<th>Nama</th>
							<th>Email</th>
							<th>No HP</th>
							<th>Role</th>
							<th>Actions</th>
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
							{users.map((user, i) => (
								<tr key={i}>
									<td>{user.nopeg}</td>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>{user.noHp}</td>
									<td>{user.roleId === 1 ? 'Admin' : 'User'}</td>
									<td>
										<Link className="btn-edit" to={'/users/' + user.uuid}>
											Edit
										</Link>
										&nbsp;
										<button onClick={() => onDelete(user)} className="btn-delete">
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					)}
				</table>
			</div>
		</div>
	);
};

export default Users;
