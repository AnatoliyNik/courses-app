import logo from '../../../../assets/images.png';

import classes from './Logo.module.css';

const Logo = () => {
	return (
		<img
			className={classes.Logo}
			src={logo}
			alt='logo'
			width={73}
			height={50}
		/>
	);
};

export default Logo;
