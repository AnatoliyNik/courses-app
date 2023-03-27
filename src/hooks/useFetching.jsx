import { useState } from 'react';

export const useFetching = function (callback) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState({});

	const handleErrors = (errors) => {
		errors.forEach((e) => {
			let [type, ...message] = e.split(' ');
			message = message.join(' ');

			if (type.includes('email')) {
				setError({
					...error,
					emailError: message,
				});
				return;
			}

			if (type.includes('password')) {
				setError({
					...error,
					passwordError: message,
				});
			}
		});
	};

	const fetching = async (...args) => {
		try {
			setIsLoading(true);
			await callback(...args);
		} catch (e) {
			if (e.response) {
				if (e.response.data.errors) {
					handleErrors(e.response.data.errors);
				} else if (e.response.data.result) {
					setError({
						...error,
						message: e.response.data.result,
					});
				} else {
					setError({
						...error,
						message: e.message,
					});
				}
			} else {
				setError({
					...error,
					message: e.message,
				});
			}
		} finally {
			setIsLoading(false);
		}
	};

	return [fetching, isLoading, error, setError];
};
