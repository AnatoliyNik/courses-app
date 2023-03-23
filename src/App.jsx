import './App.css';

import Header from './components/Header/Header';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { privateRoutes, publicRoutes } from './routes/routes';

import { useDispatch, useSelector } from 'react-redux';

import { getUser_selector } from './store/selectors';

import { loginUser_actionCreator } from './store/user/actionCreators';

import { useEffect } from 'react';

function App() {
	const user = useSelector(getUser_selector);

	const routes = user.token ? privateRoutes : publicRoutes;

	const dispatch = useDispatch();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));

		if (user) {
			dispatch(loginUser_actionCreator(user));
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
