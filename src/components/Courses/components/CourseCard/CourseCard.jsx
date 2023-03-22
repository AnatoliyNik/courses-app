import Button from '../../../../common/Button/Button';

import classes from './CourseCard.module.css';

import { SHOW_COURSE_BUTTON_TEXT } from '../../../../constants';

import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

const CourseCard = (props) => {
	const navigate = useNavigate();

	const showCourse = () => {
		navigate(props.id);
	};

	return (
		<article className={classes.CourseCard}>
			<div className={classes.description}>
				<h2>{props.title}</h2>
				<p>{props.description}</p>
			</div>
			<ul className={classes.info}>
				<li>
					<span className={classes.infoName}>authors:</span>
					<span className={classes.infoData}>{props.authors}</span>
				</li>
				<li>
					<span className={classes.infoName}>duration:</span>
					<span className={classes.infoData}>{props.duration}</span>
				</li>
				<li>
					<span className={classes.infoName}>created:</span>
					<span className={classes.infoData}>{props.creationDate}</span>
				</li>
				<li className={classes.button}>
					<Button onClick={showCourse} buttonText={SHOW_COURSE_BUTTON_TEXT} />
				</li>
			</ul>
		</article>
	);
};

CourseCard.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	authors: PropTypes.string,
	duration: PropTypes.string,
	creationDate: PropTypes.string,
	id: PropTypes.string,
};

export default CourseCard;
