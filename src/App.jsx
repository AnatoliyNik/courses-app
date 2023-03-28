import './App.css';

import Header from './components/Header/Header';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { privateRoutes, publicRoutes } from './routes/routes';

import { useDispatch, useSelector } from 'react-redux';

import { getUserSelector } from './store/selectors';

import { useEffect } from 'react';

import { getUserDataAsyncActionCreator } from './store/user/thunk';

function App() {
	const user = useSelector(getUserSelector);

	const routes = user.token ? privateRoutes : publicRoutes;

	const dispatch = useDispatch();

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('token'));

		if (token) {
			dispatch(getUserDataAsyncActionCreator(token));
		}
	}, [dispatch]);

	return (
		<BrowserRouter>
			<div className='App'>
				<Header />

				<Routes>
					{routes.map((route, index) => (
						<Route key={index} path={route.path} element={route.element} />
					))}
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
