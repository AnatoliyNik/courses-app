import Button from '../../../../common/Button/Button';
import EditIcon from '../../../../common/assets/EditIcon';
import DeleteIcon from '../../../../common/assets/DeleteIcon';
import Loader from '../../../Loader/Loader';

import classes from './CourseCard.module.css';

import {
	ADMIN_ROLE,
	CONFIRM_DELETION_MESSAGE,
	NOT_FOUND_MESSAGE,
	SHOW_COURSE_BUTTON_TEXT,
	UPDATE_COURSE_WITHOUT_ID_ROUTE,
} from '../../../../constants';

import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { getUserSelector } from '../../../../store/selectors';

import { deleteCourseAsyncActionCreator } from '../../../../store/courses/thunk';

import { useFetching } from '../../../../hooks/useFetching';

const CourseCard = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = useSelector(getUserSelector);

	const showCourse = () => {
		navigate(props.id);
	};

	const [fetching, isLoading, error] = useFetching((id, token) =>
		dispatch(deleteCourseAsyncActionCreator(id, token))
	);

	const deleteCourse = () => {
		if (!window.confirm(CONFIRM_DELETION_MESSAGE)) {
			return;
		}

		fetching(props.id, user.token);
	};

	const editCourse = () => {
		navigate(UPDATE_COURSE_WITHOUT_ID_ROUTE + props.id);
	};

	return (
		<article className={classes.CourseCard}>
			{isLoading && <Loader />}

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
					{user.role === ADMIN_ROLE && (
						<>
							<span className={classes.iconButton}>
								<Button onClick={editCourse} buttonText={<EditIcon />} />
							</span>
							<span className={classes.iconButton}>
								<Button onClick={deleteCourse} buttonText={<DeleteIcon />} />
							</span>
						</>
					)}
				</li>
				{error.message && <li className={classes.error}>{error.message}</li>}
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
