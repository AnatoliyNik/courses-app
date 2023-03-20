import classes from './Button.module.css';

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

export default Button;
