import { createContext, useState } from 'react';

import classes from './CreateCourse.module.css';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import TextArea from '../../common/TextArea/TextArea';
import Authors from './components/Authors/Authors';

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
} from '../../constants';

import { v4 as uuidv4 } from 'uuid';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addCourse_actionCreator } from '../../store/courses/actionCreators';

export const CourseContext = createContext(null);

const CreateCourse = () => {
	const [duration, setDuration] = useState(0);
	const [courseAuthors, setCourseAuthors] = useState([]);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [isShowError, setIsShowError] = useState(false);
	const [pristine, setPristine] = useState(true);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const createCourse = () => {
		if (
			!title ||
			description.length < DESCRIPTION_MIN_LENGTH ||
			!duration ||
			!courseAuthors.length
		) {
			alert(FILL_ALERT_MESSAGE);
			return;
		}

		const course = {
			id: uuidv4(),
			title,
			description,
			creationDate: new Date().toLocaleDateString('en-US'),
			duration,
			authors: courseAuthors.map((a) => a.id),
		};

		dispatch(addCourse_actionCreator(course));

		navigate(COURSES_ROUTE);
	};

	const changeTitle = (e) => {
		setTitle(e.target.value);
	};

	const changeDescription = (e) => {
		const value = e.target.value.trim();

		if (pristine) {
			setPristine(false);
		}

		if (value.length < DESCRIPTION_MIN_LENGTH && !isShowError) {
			setIsShowError(true);
		}

		if (value.length >= DESCRIPTION_MIN_LENGTH && isShowError) {
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
			<div className={classes.CreateCourse}>
				<div className={classes.title}>
					<Input
						labelText={TITLE_LABEL_TEXT}
						placeholderText={ENTER_TITLE_PLACEHOLDER_TEXT}
						onChange={changeTitle}
					/>
					<Button
						onClick={createCourse}
						buttonText={CREATE_COURSE_BUTTON_TEXT}
					/>
				</div>

				<div>
					<TextArea
						labelText={DESCRIPTION_LABEL_TEXT}
						placeholderText={ENTER_DESCRIPTION_PLACEHOLDER_TEXT}
						onChange={changeDescription}
						onRefresh={refresh}
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

export default CreateCourse;
