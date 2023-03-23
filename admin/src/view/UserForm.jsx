import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

const UserForm = () => {
	const { uuid } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState(null);
	const { setNotification } = useStateContext();
	const [user, setUser] = useState({
		uuid: null,
		nopeg: '',
		name: '',
		email: '',
		noHp: '',
		password: '',
		confirmPassword: '',
		roleId: '',
	});

	if (uuid) {
		useEffect(() => {
			setLoading(true);
			axiosClient
				.get(`/user/${uuid}`)
				.then(({ data }) => {
					setLoading(false);
					setUser(data.data);
				})
				.catch(() => {
					setLoading(false);
				});
		}, []);
	}

	const onSubmit = (e) => {
		e.preventDefault();
		if (user.uuid) {
			axiosClient
				.put(`/admin/user/${user.uuid}`, user)
				.then(() => {
					setNotification('User was successfully updated');
					navigate('/users');
				})
				.catch((err) => {
					const res = err.response;
					// if (res && res.status === 422) {
					// 	setErrors(res.data.errors);
					// }
					setErrors(res.data.message);
				});
		} else {
			axiosClient
				.post(`/auth/register`, user)
				.then(() => {
					setNotification('User was successfully created');
					navigate('/users');
				})
				.catch((err) => {
					const res = err.response;
					// if (res && res.status === 422) {
					// 	setErrors(res.data.errors);
					// }
					setErrors(res.data.message);
				});
		}
	};

	return (
		<>
			{user.uuid && <h1>Update User</h1>}
			{!user.uuid && <h1>New User</h1>}
			<div className="card animated fadeInDown">
				{loading && <div className="text-center">Loading...</div>}
				{errors && (
					<div className="alert">
						{Object.keys(errors).map((key) => (
							<p key={key}>{errors[key][0]}</p>
						))}
					</div>
				)}
				{!loading && (
					<form action="" onSubmit={onSubmit}>
						<input
							type="text"
							required={true}
							value={user.nopeg}
							onChange={(ev) => setUser({ ...user, nopeg: ev.target.value })}
							placeholder="No Pegawai"
						/>
						<input
							type="email"
							required={true}
							value={user.email}
							onChange={(ev) => setUser({ ...user, email: ev.target.value })}
							placeholder="Email"
						/>
						<input
							type="text"
							required={true}
							value={user.name}
							onChange={(ev) => setUser({ ...user, name: ev.target.value })}
							placeholder="Name"
						/>
						<input
							type="text"
							required={true}
							value={user.noHp}
							onChange={(ev) => setUser({ ...user, noHp: ev.target.value })}
							placeholder="No HP"
						/>
						<input
							type="password"
							required={true}
							onChange={(ev) => setUser({ ...user, password: ev.target.value })}
							placeholder="Password"
						/>
						<input
							type="password"
							required={true}
							onChange={(ev) => setUser({ ...user, confirmPassword: ev.target.value })}
							placeholder="Confirm Password"
						/>
						<input
							type="number"
							required={true}
							value={user.roleId}
							onChange={(ev) => setUser({ ...user, roleId: ev.target.value })}
							placeholder="Role Id"
						/>
						<button className="btn-add" style={{ height: '40px' }}>
							Save
						</button>
					</form>
				)}
			</div>
		</>
	);
};

export default UserForm;
