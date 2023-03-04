import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

const UserForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState(null);
	const { setNotification } = useStateContext();
	const [user, setUser] = useState({
		id: null,
		nopeg: '',
		name: '',
		email: '',
		noHp: '',
		password: '',
	});

	if (id) {
		useEffect(() => {
			setLoading(true);
			axiosClient
				.get(`/user/${id}`)
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
		if (user.id) {
			axiosClient
				.put(`/users/${user.id}`, user)
				.then(() => {
					setNotification('User was successfully updated');
					navigate('/users');
				})
				.catch((err) => {
					const res = err.response;
					if (res && res.status === 422) {
						setErrors(res.data.errors);
					}
				});
		} else {
			axiosClient
				.post(`/users`, user)
				.then(() => {
					setNotification('User was successfully created');
					navigate('/users');
				})
				.catch((err) => {
					const res = err.response;
					if (res && res.status === 422) {
						setErrors(res.data.errors);
					}
				});
		}
	};

	return (
		<>
			{user.id && <h1>Update User: {user.name}</h1>}
			{!user.id && <h1>New User</h1>}
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
							value={user.nopeg}
							disabled={true}
							onChange={(ev) => setUser({ ...user, nopeg: ev.target.value })}
							placeholder="No Pegawai"
						/>
						<input
							type="email"
							value={user.email}
							onChange={(ev) => setUser({ ...user, email: ev.target.value })}
							placeholder="Email"
						/>
						<input
							type="text"
							value={user.name}
							onChange={(ev) => setUser({ ...user, name: ev.target.value })}
							placeholder="Name"
						/>
						<input
							type="text"
							value={user.noHp}
							onChange={(ev) => setUser({ ...user, noHp: ev.target.value })}
							placeholder="No HP"
						/>
						<input
							type="password"
							onChange={(ev) => setUser({ ...user, password: ev.target.value })}
							placeholder="Password"
						/>
						<button className="btn">Save</button>
					</form>
				)}
			</div>
		</>
	);
};

export default UserForm;
