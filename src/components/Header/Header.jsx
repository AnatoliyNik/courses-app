import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import classes from './Header.module.css';

import { LOGOUT_BUTTON_TEXT } from '../../constants';

import { useDispatch, useSelector } from 'react-redux';

import { getUserSelector } from '../../store/selectors';

import { logoutUserActionCreator } from '../../store/user/actionCreators';

const Header = () => {
	const user = useSelector(getUserSelector);

	const dispatch = useDispatch();

	const logout = () => {
		dispatch(logoutUserActionCreator());
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
