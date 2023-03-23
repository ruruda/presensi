import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

const DefaultLayout = () => {
	const { user, token, notification, setUser, setToken } = useStateContext();

	if (!token) {
		return <Navigate to="/login" />;
	}

	const onLogout = (e) => {
		e.preventDefault();
		setUser('');
		setToken(null);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const { data } = await axiosClient.get('/auth/me');
			setUser(data.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div id="defaultLayout">
			<aside>
				<Link to="/dashboard">Dashboard</Link>
				<Link to="/users">Users</Link>
				<Link to="/kehadiran">Kehadiran</Link>
				<Link to="/qrcode">QR Code</Link>
			</aside>
			<div className="content">
				<header>
					<div>
						<p>Welcome, {user.name}</p>
					</div>
					<div>
						<a className="btn-logout" href="#" onClick={onLogout}>
							Logout
						</a>
					</div>
				</header>
				<main>
					<Outlet />
				</main>
			</div>

			{notification && <div className="notification">{notification}</div>}
		</div>
	);
};

export default DefaultLayout;
