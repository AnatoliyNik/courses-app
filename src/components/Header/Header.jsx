import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import classes from './Header.module.css';
import { LOGOUT_BUTTON_TEXT } from '../../constants';

const Header = () => {
	const name = 'Dave';

	return (
		<div className={classes.Header}>
			<Logo />
			<ul className={classes.auth}>
				<li>
					<span className={classes.name}>{name}</span>
				</li>
				<li>
					<Button buttonText={LOGOUT_BUTTON_TEXT} />
				</li>
			</ul>
		</div>
	);
};

export default Header;
