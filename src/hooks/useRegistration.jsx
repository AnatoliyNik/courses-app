import { PASSWORD_MIN_LENGTH } from '../constants';

import { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useFetching } from './useFetching';

import axios from 'axios';

import { AuthorContext } from '../GlobalContext/GlobalContext';

export const useRegistration = function (url, navigateTo) {
	let [name, setName] = useState('');
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	const { setUser } = useContext(AuthorContext);

	const navigate = useNavigate();

	const [fetching, isLoading, error, setError] = useFetching(
		async (newUser) => {
			const response = await axios.post(
				`http://localhost:4000/${url}`,
				newUser,
				{
					headers: { 'Content-Type': 'application/json' },
				}
			);

			if (url === 'login') {
				const userData = {
					name: response.data.user.name,
					token: response.data.result,
				};

				localStorage.setItem('user', JSON.stringify(userData));

				setUser(userData);
			}

			navigate(navigateTo);
		}
	);

	const changeName = (e) => {
		if (error.nameError) {
			setError({
				...error,
				nameError: '',
			});
		}

		if (error.message) {
			setError({
				...error,
				message: '',
			});
		}

		setName(e.target.value);
	};

	const changeEmail = (e) => {
		if (error.emailError) {
			setError({
				...error,
				emailError: '',
			});
		}

		if (error.message) {
			setError({
				...error,
				message: '',
			});
		}

		setEmail(e.target.value);
	};

	const changePassword = (e) => {
		if (error.passwordError) {
			setError({
				...error,
				passwordError: '',
			});
		}

		if (error.message) {
			setError({
				...error,
				message: '',
			});
		}

		setPassword(e.target.value);
	};

	const submit = async (e) => {
		e.preventDefault();

		error.message = '';

		name = name.trim();
		email = email.trim();
		password = password.trim();

		let inputError = false;

		if (!name) {
			error.nameError = 'required';
			inputError = url === 'register';
		}

		if (!email) {
			error.emailError = 'required';
			inputError = true;
		}

		if (password.length < PASSWORD_MIN_LENGTH) {
			error.passwordError = `required at least ${PASSWORD_MIN_LENGTH} symbols`;
			inputError = true;
		}

		setError({
			...error,
		});

		if (inputError) {
			return;
		}

		const newUser =
			url === 'register'
				? {
						name,
						email,
						password,
				  }
				: {
						email,
						password,
				  };

		await fetching(newUser);
	};
	return [submit, changeEmail, changePassword, isLoading, error, changeName];
};
