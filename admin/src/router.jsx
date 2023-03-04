import { createBrowserRouter, Navigate } from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import Dashboard from './view/Dashboard';
import Login from './view/Login';
import NotFound from './view/NotFound';
import QRPage from './view/QRPage';
import Signup from './view/Signup';
import UserForm from './view/UserForm';
import Users from './view/Users';

const router = createBrowserRouter([
	{
		path: '/',
		element: <DefaultLayout />,
		children: [
			{
				path: '/',
				element: <Navigate to="/users" />,
			},
			{
				path: '/users',
				element: <Users />,
			},
			{
				path: '/users/new',
				element: <UserForm key="userCreate" />,
			},
			{
				path: '/users/:id',
				element: <UserForm key="userCreate" />,
			},
			{
				path: '/dashboard',
				element: <Dashboard />,
			},
			{
				path: '/qrcode',
				element: <QRPage />,
			},
		],
	},
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/signup',
				element: <Signup />,
			},
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

export default router;
