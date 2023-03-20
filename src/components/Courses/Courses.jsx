import { useContext, useEffect, useState } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import CreateCourse from '../CreateCourse/CreateCourse';

import classes from './Courses.module.css';

import {
	ADD_NEW_COURSE_BUTTON_TEXT,
	NO_COURSE_FOUND_MESSAGE,
} from '../../constants';

import { getAuthors } from '../../helpers/getAuthors';
import { pipeDuration } from '../../helpers/pipeDuration';
import { dateGeneratop } from '../../helpers/dateGeneratop';

import { AuthorContext } from '../../GlobalContext/GlobalContext';

const Courses = () => {
	const { isShowCreateCourse, setIsShowCreateCourse, courses, authors } =
		useContext(AuthorContext);

	const [courseList, setCourseList] = useState([...courses]);

	const [query, setQuery] = useState('');

	useEffect(() => {
		search();
		// eslint-disable-next-line
    }, [courses]);

	if (isShowCreateCourse) {
		return <CreateCourse />;
	}

	const change = (e) => {
		const query = e.target.value;

		setQuery(query);

		if (query === '') {
			setCourseList(courses);
		}
	};

	const search = () => {
		if (query === '') {
			setCourseList(courses);
			return;
		}

		const q = query.toLowerCase();

		const filtered = courses.filter(
			(el) =>
				el.title.toLowerCase().includes(q) || el.id.toLowerCase().includes(q)
		);

		setCourseList(filtered);
	};

	const showCreateNewCourse = () => {
		setIsShowCreateCourse(true);
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

			{courseList.length ? (
				courseList.map((card) => (
					<CourseCard
						key={card.id}
						title={card.title}
						description={card.description}
						authors={getAuthors(card.authors, authors)}
						duration={pipeDuration(card.duration) + ' hours'}
						creationDate={dateGeneratop(card.creationDate)}
					/>
				))
			) : (
				<p>{NO_COURSE_FOUND_MESSAGE}</p>
			)}
		</div>
	);
};

export default Courses;
