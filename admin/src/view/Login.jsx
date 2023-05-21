import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [message, setMessage] = useState(null);
	const { setUser, setToken } = useStateContext();

	const onSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			email: emailRef.current.value,
			password: passwordRef.current.value,
		};
		try {
			const response = await axiosClient.post('/admin/login', payload);
			const data = response.data.data;
			console.log(data.accessToken);
			setToken(data.accessToken);
		} catch (err) {
			const response = err.response;
			setMessage(response.data.message);
		}
	};

	return (
		<div className="login-signup-form animated fadeInDown">
			<div className="form">
				<form action="" onSubmit={onSubmit}>
					<h1 className="title">Login into your account</h1>
					{message && (
						<div className="alert">
							<p>{message}</p>
						</div>
					)}
					<input ref={emailRef} type="email" placeholder="Email" />
					<input ref={passwordRef} type="password" placeholder="Password" />
					<button className="btn btn-block">Login</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
