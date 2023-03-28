import { createContext, useEffect, useState } from 'react';

import classes from './CourseForm.module.css';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import TextArea from '../../common/TextArea/TextArea';
import Authors from './components/Authors/Authors';
import Loader from '../Loader/Loader';

import {
	COURSES_ROUTE,
	CREATE_COURSE_BUTTON_TEXT,
	DESCRIPTION_ERROR_MESSAGE,
	DESCRIPTION_LABEL_TEXT,
	DESCRIPTION_MIN_LENGTH,
	ENTER_DESCRIPTION_PLACEHOLDER_TEXT,
	ENTER_TITLE_PLACEHOLDER_TEXT,
	FILL_ALERT_MESSAGE,
	TITLE_LABEL_TEXT,
	UPDATE_COURSE_BUTTON_TEXT,
} from '../../constants';

import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import {
	getAuthorsSelector,
	getCoursesSelector,
	getUserSelector,
} from '../../store/selectors';

import {
	addCourseAsyncActionCreator,
	updateCourseAsyncActionCreator,
} from '../../store/courses/thunk';

import { useFetching } from '../../hooks/useFetching';

export const CourseContext = createContext(null);

const CourseForm = () => {
	const [duration, setDuration] = useState(0);
	const [courseAuthors, setCourseAuthors] = useState([]);
	let [title, setTitle] = useState('');
	let [description, setDescription] = useState('');
	const [isShowError, setIsShowError] = useState(false);
	const [pristine, setPristine] = useState(true);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const { courseId } = useParams();

	const courses = useSelector(getCoursesSelector);
	const authors = useSelector(getAuthorsSelector);
	const user = useSelector(getUserSelector);

	const courseEdit = courses.find((course) => course.id === courseId);

	const [fetching, isLoading, error] = useFetching((course, token) =>
		courseEdit
			? dispatch(updateCourseAsyncActionCreator(course.id, course, token))
			: dispatch(addCourseAsyncActionCreator(course, token))
	);

	const [endOfFetching, setEndOfFetching] = useState(false);

	useEffect(() => {
		if (endOfFetching && !error.message) {
			navigate(COURSES_ROUTE);
		}
	}, [endOfFetching, error, navigate]);

	useEffect(() => {
		if (!courseEdit) {
			return;
		}

		setTitle(courseEdit.title);
		setDescription(courseEdit.description);
		setDuration(courseEdit.duration);

		setCourseAuthors(
			authors.filter((author) => courseEdit.authors.includes(author.id))
		);
	}, [authors, courseEdit]);

	const createCourse = async () => {
		title = title.trim();
		description = description.trim();

		if (
			!title ||
			description.length < DESCRIPTION_MIN_LENGTH ||
			!duration ||
			!courseAuthors.length
		) {
			alert(FILL_ALERT_MESSAGE);
			return;
		}

		const newCourse = {
			...courseEdit,
			title,
			description,
			duration,
			authors: courseAuthors.map((a) => a.id),
		};

		setEndOfFetching(false);

		await fetching(newCourse, user.token);

		setEndOfFetching(true);
	};

	const changeTitle = (e) => {
		setTitle(e.target.value);
	};

	const changeDescription = (e) => {
		const value = e.target.value;
		const trimmedValue = value.trim();

		if (pristine) {
			setPristine(false);
		}

		if (trimmedValue.length < DESCRIPTION_MIN_LENGTH && !isShowError) {
			setIsShowError(true);
		}

		if (trimmedValue.length >= DESCRIPTION_MIN_LENGTH && isShowError) {
			setIsShowError(false);
		}

		setDescription(value);
	};

	const refresh = () => {
		setDescription('');

		if (!isShowError) {
			setIsShowError(true);
		}
	};

	return (
		<CourseContext.Provider
			value={{ duration, setDuration, courseAuthors, setCourseAuthors }}
		>
			<div className={classes.CourseForm}>
				{isLoading && <Loader />}

				<div className={classes.title}>
					<Input
						labelText={TITLE_LABEL_TEXT}
						placeholderText={ENTER_TITLE_PLACEHOLDER_TEXT}
						onChange={changeTitle}
						value={title}
					/>

					{error.message && <p className={classes.error}>{error.message}</p>}

					<Button
						onClick={createCourse}
						buttonText={
							courseEdit ? UPDATE_COURSE_BUTTON_TEXT : CREATE_COURSE_BUTTON_TEXT
						}
					/>
				</div>

				<div>
					<TextArea
						labelText={DESCRIPTION_LABEL_TEXT}
						placeholderText={ENTER_DESCRIPTION_PLACEHOLDER_TEXT}
						onChange={changeDescription}
						onRefresh={refresh}
						value={description}
					/>

					{!pristine && isShowError && (
						<small className={classes.error}>{DESCRIPTION_ERROR_MESSAGE}</small>
					)}
				</div>

				<Authors />
			</div>
		</CourseContext.Provider>
	);
};

export default CourseForm;
