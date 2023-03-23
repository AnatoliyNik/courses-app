import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import classes from './Header.module.css';

import { LOGOUT_BUTTON_TEXT } from '../../constants';

import { useDispatch, useSelector } from 'react-redux';

import { getUser_selector } from '../../store/selectors';

import { logoutUser_actionCreator } from '../../store/user/actionCreators';

const Header = () => {
	const user = useSelector(getUser_selector);

	const dispatch = useDispatch();

	const logout = () => {
		dispatch(logoutUser_actionCreator());
	};

	return (
		<div className={classes.Header}>
			<Logo />

			{user.isAuth && (
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
