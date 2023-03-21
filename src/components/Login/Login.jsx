import classes from './Login.module.css';

import {
	COURSES_ROUTE,
	LOGIN_BUTTON_TEXT,
	LOGIN_EMAIL_LABEL_TEXT,
	LOGIN_ENTER_EMAIL_PLACEHOLDER_TEXT,
	LOGIN_ENTER_PASSWORD_PLACEHOLDER_TEXT,
	LOGIN_PASSWORD_LABEL_TEXT,
	LOGIN_TITLE_TEXT,
	REGISTRATION_ROUTE,
} from '../../constants';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Loader from '../Loader/Loader';

import { Link } from 'react-router-dom';

import { useRegistration } from '../../hooks/useRegistration';

const Login = () => {
	const [submit, changeEmail, changePassword, isLoading, error] =
		useRegistration('login', COURSES_ROUTE);

	return (
		<div className={classes.Login}>
			{isLoading && <Loader />}
			<form onSubmit={submit} className={classes.form}>
				<h1>{LOGIN_TITLE_TEXT}</h1>
				<div>
					<Input
						labelText={LOGIN_EMAIL_LABEL_TEXT}
						placeholderText={LOGIN_ENTER_EMAIL_PLACEHOLDER_TEXT}
						type='email'
						onChange={changeEmail}
					/>
					{error.emailError && (
						<p className={classes.error}>
							<small>{error.emailError}</small>
						</p>
					)}
				</div>
				<div>
					<Input
						labelText={LOGIN_PASSWORD_LABEL_TEXT}
						placeholderText={LOGIN_ENTER_PASSWORD_PLACEHOLDER_TEXT}
						type='password'
						onChange={changePassword}
					/>
					{error.passwordError && (
						<p className={classes.error}>
							<small>{error.passwordError}</small>
						</p>
					)}
				</div>

				{error.message ? (
					<p className={classes.error}>{error.message}</p>
				) : (
					<br />
				)}

				<Button buttonText={LOGIN_BUTTON_TEXT} />
				<p>
					<small>
						If you have not an account you can{' '}
						<Link className={classes.link} to={REGISTRATION_ROUTE}>
							Registration
						</Link>
					</small>
				</p>
			</form>
		</div>
	);
};

export default Login;
