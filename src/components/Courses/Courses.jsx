import { useCallback, useEffect, useState } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import Loader from '../Loader/Loader';

import classes from './Courses.module.css';

import {
	ADD_NEW_COURSE_BUTTON_TEXT,
	ADMIN_ROLE,
	CREATE_COURSE_ROUTE,
	NO_COURSE_FOUND_MESSAGE,
} from '../../constants';

import { getAuthors } from '../../helpers/getAuthors';
import { pipeDuration } from '../../helpers/pipeDuration';
import { dateGeneratop } from '../../helpers/dateGeneratop';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import {
	getAuthorsSelector,
	getCoursesSelector,
	getUserSelector,
} from '../../store/selectors';

import { useFetching } from '../../hooks/useFetching';
import { useEffectOnce } from '../../hooks/useEffectOnce';

import { getAuthorsAsyncActionCreator } from '../../store/authors/thunk';
import { getCoursesAsyncActionCreator } from '../../store/courses/thunk';

const Courses = () => {
	const courses = useSelector(getCoursesSelector);
	const authors = useSelector(getAuthorsSelector);
	const user = useSelector(getUserSelector);

	const dispatch = useDispatch();

	const [courseList, setCourseList] = useState([]);

	const [query, setQuery] = useState('');

	const navigate = useNavigate();

	const [fetchingCourses, isLoadingCourses, errorCourses] = useFetching(() =>
		dispatch(getCoursesAsyncActionCreator())
	);

	const [fetchingAuthors, isLoadingAuthors, errorAuthors] = useFetching(() =>
		dispatch(getAuthorsAsyncActionCreator())
	);

	useEffectOnce(() => {
		if (!courses.length) {
			fetchingCourses();
		}
	});

	useEffectOnce(() => {
		if (!authors.length) {
			fetchingAuthors();
		}
	});

	useEffect(() => {
		setCourseList([...courses]);
	}, [courses]);

	const search = useCallback(() => {
		if (query === '') {
			setCourseList(courses);
			return;
		}

		const q = query.toLowerCase();

		setCourseList(
			courses.filter(
				(el) =>
					el.title.toLowerCase().includes(q) || el.id.toLowerCase().includes(q)
			)
		);
	}, [courses, query]);

	const change = (e) => {
		const query = e.target.value;

		setQuery(query);

		if (query === '') {
			setCourseList(courses);
		}
	};

	const showCreateNewCourse = () => {
		navigate(CREATE_COURSE_ROUTE);
	};

	return (
		<div className={classes.Courses}>
			<div className={classes.searchingPanel}>
				<SearchBar value={query} onClick={search} onChange={change} />
				{user.role === ADMIN_ROLE && (
					<Button
						onClick={showCreateNewCourse}
						buttonText={ADD_NEW_COURSE_BUTTON_TEXT}
					/>
				)}
			</div>

			{isLoadingCourses ? (
				<Loader />
			) : errorCourses.message ? (
				<p className={classes.error}>{errorCourses.message}</p>
			) : courseList.length ? (
				courseList.map((card) => (
					<CourseCard
						key={card.id}
						title={card.title}
						description={card.description}
						authors={getAuthors(card.authors, authors)}
						duration={pipeDuration(card.duration) + ' hours'}
						creationDate={dateGeneratop(card.creationDate)}
						id={card.id}
						isLoading={isLoadingAuthors}
						errorMessage={errorAuthors.message}
					/>
				))
			) : (
				<p>{NO_COURSE_FOUND_MESSAGE}</p>
			)}
		</div>
	);
};

export default Courses;
