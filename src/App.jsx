import './App.css';

import Header from './components/Header/Header';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useContext } from 'react';

import { AuthorContext } from './GlobalContext/GlobalContext';
import { privateRoutes, publicRoutes } from './routes/routes';

function App() {
	const { user } = useContext(AuthorContext);

	const routes = user.token ? privateRoutes : publicRoutes;

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
