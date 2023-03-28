import { PASSWORD_MIN_LENGTH } from '../constants';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useFetching } from './useFetching';

import { useDispatch } from 'react-redux';

import { login, register } from '../services';

import { getUserDataAsyncActionCreator } from '../store/user/thunk';

export const useRegistration = function (action, navigateTo) {
	let [name, setName] = useState('');
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [fetching, isLoading, error, setError] = useFetching(
		async (newUser) => {
			const response =
				action === 'login' ? await login(newUser) : await register(newUser);

			if (action === 'login') {
				dispatch(getUserDataAsyncActionCreator(response.data.result));
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

		const submitError = {};

		submitError.message = '';

		name = name.trim();
		email = email.trim();
		password = password.trim();

		let inputError = false;

		if (!name) {
			submitError.nameError = 'required';
			inputError = action === 'register';
		}

		if (!email) {
			submitError.emailError = 'required';
			inputError = true;
		}

		if (password.length < PASSWORD_MIN_LENGTH) {
			submitError.passwordError = `required at least ${PASSWORD_MIN_LENGTH} symbols`;
			inputError = true;
		}

		setError({
			...error,
			...submitError,
		});

		if (inputError) {
			return;
		}

		const newUser =
			action === 'register'
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
