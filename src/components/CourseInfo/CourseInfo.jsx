import classes from './CourseInfo.module.css';

import { Link, useParams } from 'react-router-dom';

import {
	COURSEINFO_BUTTON_TEXT,
	COURSES_ROUTE,
	NOT_FOUND_MESSAGE,
} from '../../constants';

import { getArrayOfAuthors } from '../../helpers/getAuthors';
import { dateGeneratop } from '../../helpers/dateGeneratop';
import { pipeDuration } from '../../helpers/pipeDuration';

import { useSelector } from 'react-redux';

import {
	getAuthors_selector,
	getCourses_selector,
} from '../../store/selectors';

const CourseInfo = () => {
	const { courseId } = useParams();

	const courses = useSelector(getCourses_selector);
	const authors = useSelector(getAuthors_selector);

	const course = courses.find((course) => course.id === courseId) || {};

	return (
		<div className={classes.CourseInfo}>
			<Link to={COURSES_ROUTE} className={classes.btnBack}>
				{COURSEINFO_BUTTON_TEXT}
			</Link>

			<h1 className={classes.title}>{course.title}</h1>

			<div className={classes.content}>
				<div className={classes.description}>{course.description}</div>
				<ul className={classes.info}>
					<li>
						<span className={classes.infoName}>id:&nbsp;</span>
						<span>{courseId}</span>
					</li>
					<li>
						<span className={classes.infoName}>duration:&nbsp;</span>
						<span>{pipeDuration(course.duration)} hours</span>
					</li>
					<li>
						<span className={classes.infoName}>created:&nbsp;</span>
						<span>{dateGeneratop(course.creationDate)}</span>
					</li>
					<li>
						<span className={classes.infoName}>authors:&nbsp;</span>
						<div>
							{course.authors &&
								getArrayOfAuthors(course.authors, authors).map(
									(author, index) => (
										<p key={index}>{author || NOT_FOUND_MESSAGE}</p>
									)
								)}
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default CourseInfo;
