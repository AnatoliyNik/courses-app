import classes from './Button.module.css';

import PropTypes from 'prop-types';

const Button = (props) => {
	return (
		<button
			disabled={!!props.disabled}
			className={classes.Button}
			onClick={props.onClick}
		>
			{props.buttonText}
		</button>
	);
};

Button.propTypes = {
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
};

export default Button;
