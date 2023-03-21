import classes from './Input.module.css';
import { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
	return (
		<label>
			<p>{props.labelText}</p>
			<input
				value={props.value}
				ref={ref}
				className={classes.Input}
				onChange={props.onChange}
				type='text'
				placeholder={props.placeholderText}
			/>
		</label>
	);
});
export default Input;
