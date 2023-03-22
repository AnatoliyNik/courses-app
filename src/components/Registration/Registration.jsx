import {
	LOGIN_ROUTE,
	REGISTRATION_BUTTON_TEXT,
	REGISTRATION_EMAIL_LABEL_TEXT,
	REGISTRATION_ENTER_EMAIL_PLACEHOLDER_TEXT,
	REGISTRATION_ENTER_NAME_PLACEHOLDER_TEXT,
	REGISTRATION_ENTER_PASSWORD_PLACEHOLDER_TEXT,
	REGISTRATION_NAME_LABEL_TEXT,
	REGISTRATION_PASSWORD_LABEL_TEXT,
	REGISTRATION_TITLE_TEXT,
} from '../../constants';

import classes from './Registration.module.css';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Loader from '../Loader/Loader';

import { Link } from 'react-router-dom';

import { useRegistration } from '../../hooks/useRegistration';

const Registration = () => {
	const [submit, changeEmail, changePassword, isLoading, error, changeName] =
		useRegistration('register', 'login');

	return (
		<div className={classes.Registration}>
			{isLoading && <Loader />}

			<form onSubmit={submit} className={classes.form}>
				<h1>{REGISTRATION_TITLE_TEXT}</h1>
				<div>
					<Input
						labelText={REGISTRATION_NAME_LABEL_TEXT}
						placeholderText={REGISTRATION_ENTER_NAME_PLACEHOLDER_TEXT}
						onChange={changeName}
					/>
					{error.nameError && (
						<p className={classes.error}>
							<small>{error.nameError}</small>
						</p>
					)}
				</div>

				<div>
					<Input
						labelText={REGISTRATION_EMAIL_LABEL_TEXT}
						placeholderText={REGISTRATION_ENTER_EMAIL_PLACEHOLDER_TEXT}
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
						labelText={REGISTRATION_PASSWORD_LABEL_TEXT}
						placeholderText={REGISTRATION_ENTER_PASSWORD_PLACEHOLDER_TEXT}
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

				<Button buttonText={REGISTRATION_BUTTON_TEXT} />

				<p>
					<small>
						If you have an account you can{' '}
						<Link className={classes.link} to={LOGIN_ROUTE}>
							Login
						</Link>
					</small>
				</p>
			</form>
		</div>
	);
};

export default Registration;
