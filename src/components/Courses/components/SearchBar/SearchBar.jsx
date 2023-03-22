import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import classes from './SearchBar.module.css';

import PropTypes from 'prop-types';

import {
	SEARCH_BUTTON_TEXT,
	SEARCH_PLACEHOLDER_TEXT,
} from '../../../../constants';

const SearchBar = ({ onChange, onClick, value }) => {
	return (
		<div className={classes.SearchBar}>
			<Input
				value={value}
				onChange={onChange}
				placeholderText={SEARCH_PLACEHOLDER_TEXT}
			/>
			<Button onClick={onClick} buttonText={SEARCH_BUTTON_TEXT} />
		</div>
	);
};

SearchBar.propTypes = {
	onChange: PropTypes.func,
	onClick: PropTypes.func,
	value: PropTypes.string,
};

export default SearchBar;
