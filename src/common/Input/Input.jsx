import classes from './Input.module.css';

import { forwardRef } from 'react';

import PropTypes from 'prop-types';

const Input = forwardRef((props, ref) => {
	return (
		<label>
			<p>{props.labelText}</p>
			<input
				value={props.value}
				ref={ref}
				className={classes.Input}
				onChange={props.onChange}
				type={props.type || 'text'}
				placeholder={props.placeholderText}
			/>
		</label>
	);
});

Input.propTypes = {
	labelText: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	type: PropTypes.string,
	placeholderText: PropTypes.string,
};

export default Input;
