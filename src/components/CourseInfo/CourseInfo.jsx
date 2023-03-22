import classes from './CourseInfo.module.css';

import { useContext } from 'react';

import { Link, useParams } from 'react-router-dom';

import { AuthorContext } from '../../GlobalContext/GlobalContext';

import { COURSEINFO_BUTTON_TEXT, COURSES_ROUTE } from '../../constants';

import { getArrayOfAuthors } from '../../helpers/getAuthors';
import { dateGeneratop } from '../../helpers/dateGeneratop';
import { pipeDuration } from '../../helpers/pipeDuration';

const CourseInfo = () => {
	const { courseId } = useParams();

	const { courses, authors } = useContext(AuthorContext);

	const course = courses.find((course) => course.id === courseId);

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
									(author, index) => <p key={index}>{author}</p>
								)}
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default CourseInfo;
