import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import classes from './Header.module.css';

import { LOGOUT_BUTTON_TEXT } from '../../constants';

import { useContext } from 'react';

import { AuthorContext } from '../../GlobalContext/GlobalContext';

const Header = () => {
	const { user, setUser } = useContext(AuthorContext);

	const logout = () => {
		setUser({});
		localStorage.removeItem('user');
	};

	return (
		<div className={classes.Header}>
			<Logo />

			{user.token && (
				<ul className={classes.auth}>
					<li>
						<span className={classes.name}>{user.name}</span>
					</li>
					<li>
						<Button onClick={logout} buttonText={LOGOUT_BUTTON_TEXT} />
					</li>
				</ul>
			)}
		</div>
	);
};

export default Header;
