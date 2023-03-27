import Button from '../../../../common/Button/Button';
import EditIcon from '../../../../common/assets/EditIcon';
import DeleteIcon from '../../../../common/assets/DeleteIcon';

import classes from './CourseCard.module.css';

import {
	NOT_FOUND_MESSAGE,
	SHOW_COURSE_BUTTON_TEXT,
} from '../../../../constants';

import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { deleteCourseActionCreator } from '../../../../store/courses/actionCreators';
import Loader from '../../../Loader/Loader';

const CourseCard = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const showCourse = () => {
		navigate(props.id);
	};

	const deleteCourse = (id) => {
		dispatch(deleteCourseActionCreator(id));
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
					{props.isLoading ? (
						<Loader />
					) : props.errorMessage ? (
						<span className={classes.error}>{props.errorMessage}</span>
					) : (
						<span className={classes.infoData}>
							{props.authors || NOT_FOUND_MESSAGE}
						</span>
					)}
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
					<span className={classes.iconButton}>
						<Button buttonText={<EditIcon />} />
					</span>
					<span className={classes.iconButton}>
						<Button
							onClick={() => deleteCourse(props.id)}
							buttonText={<DeleteIcon />}
						/>
					</span>
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
	isLoading: PropTypes.bool,
	errorMessage: PropTypes.string,
};

export default CourseCard;
