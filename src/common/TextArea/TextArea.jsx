import classes from './TextArea.module.css';

import { useRef } from 'react';

import RefreshIcon from '../assets/RefreshIcon';

import PropTypes from 'prop-types';

const TextArea = (props) => {
	const ref = useRef();

	const refresh = (e) => {
		const btn = e.target.closest('button');

		ref.current.value = '';
		ref.current.focus();

		btn.animate(
			[
				{
					transform: 'rotate(-360deg)',
				},
			],
			{
				duration: 500,
				iteration: 1,
			}
		);

		props.onRefresh?.();
	};

	return (
		<label className={classes.label}>
			<p>{props.labelText}</p>
			<textarea
				ref={ref}
				cols={140}
				className={classes.TextArea}
				placeholder={props.placeholderText}
				onChange={props.onChange}
			/>
			<button onClick={refresh} className={classes.refresh}>
				<RefreshIcon />
			</button>
		</label>
	);
};

TextArea.propTypes = {
	labelText: PropTypes.string,
	placeholderText: PropTypes.string,
	onChange: PropTypes.func,
	onRefresh: PropTypes.func,
};

export default TextArea;
