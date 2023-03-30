import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import Loader from '../Loader/Loader';

import classes from './Header.module.css';

import { LOGOUT_BUTTON_TEXT } from '../../constants';

import { useDispatch, useSelector } from 'react-redux';

import { getUserSelector } from '../../store/selectors';

import { logoutUserAsyncActionCreator } from '../../store/user/thunk';

import { useFetching } from '../../hooks/useFetching';

const Header = () => {
	const user = useSelector(getUserSelector);

	const dispatch = useDispatch();

	const [fetching, isLoading, error] = useFetching(() =>
		dispatch(logoutUserAsyncActionCreator(user.token))
	);

	const logout = () => {
		fetching();
	};

	return (
		<div className={classes.Header}>
			<Logo />

			{isLoading ? (
				<Loader />
			) : (
				error.message && <p className={classes.error}>{error.message}</p>
			)}

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
