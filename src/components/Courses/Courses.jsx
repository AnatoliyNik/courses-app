import { useCallback, useEffect, useState } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import Loader from '../Loader/Loader';

import classes from './Courses.module.css';

import {
	ADD_NEW_COURSE_BUTTON_TEXT,
	CREATE_COURSE_ROUTE,
	NO_COURSE_FOUND_MESSAGE,
	STATUS_CODE_OK,
} from '../../constants';

import { getAuthors } from '../../helpers/getAuthors';
import { pipeDuration } from '../../helpers/pipeDuration';
import { dateGeneratop } from '../../helpers/dateGeneratop';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { getAuthorsSelector, getCoursesSelector } from '../../store/selectors';

import { useFetching } from '../../hooks/useFetching';
import { useEffectOnce } from '../../hooks/useEffectOnce';

import { getAllAuthors, getAllCourses } from '../../services';

import { getCoursesActionCreator } from '../../store/courses/actionCreators';
import { getAuthorsActionCreator } from '../../store/authors/actionCreators';

const Courses = () => {
	const courses = useSelector(getCoursesSelector);
	const authors = useSelector(getAuthorsSelector);

	const dispatch = useDispatch();

	const [courseList, setCourseList] = useState([]);

	const [query, setQuery] = useState('');

	const navigate = useNavigate();

	const [fetchingCourses, isLoadingCourses, errorCourses] = useFetching(
		async () => {
			const res = await getAllCourses();

			if (res.status === STATUS_CODE_OK) {
				dispatch(getCoursesActionCreator(res.data.result));
			}
		}
	);

	const [fetchingAuthors, isLoadingAuthors, errorAuthors] = useFetching(
		async () => {
			const res = await getAllAuthors();
			if (res.status === STATUS_CODE_OK) {
				dispatch(getAuthorsActionCreator(res.data.result));
			}
		}
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
				<Button
					onClick={showCreateNewCourse}
					buttonText={ADD_NEW_COURSE_BUTTON_TEXT}
				/>
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
