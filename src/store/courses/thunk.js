import {
	addCourse,
	deleteCourse,
	getAllCourses,
	updateCourse,
} from '../../services';

import {
	addCourseActionCreator,
	deleteCourseActionCreator,
	getCoursesActionCreator,
	updateCourseActionCreator,
} from './actionCreators';

export const deleteCourseAsyncActionCreator =
	(id, token) => async (dispatch) => {
		const response = await deleteCourse(id, token);

		if (!response.data.successful) {
			throw new Error(response.data.result);
		}

		dispatch(deleteCourseActionCreator(id));
	};

export const updateCourseAsyncActionCreator =
	(id, course, token) => async (dispatch) => {
		const response = await updateCourse(id, course, token);

		if (!response.data.successful) {
			throw new Error(response.data.result);
		}

		dispatch(updateCourseActionCreator(response.data.result));
	};

export const addCourseAsyncActionCreator =
	(course, token) => async (dispatch) => {
		const response = await addCourse(course, token);

		dispatch(addCourseActionCreator(response.data.result));
	};

export const getCoursesAsyncActionCreator = () => async (dispatch) => {
	const response = await getAllCourses();

	dispatch(getCoursesActionCreator(response.data.result));
};
