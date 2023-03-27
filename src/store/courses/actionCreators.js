import { ADD_COURSE, DELETE_COURSE, GET_COURSES } from './actionTypes';

export function getCoursesActionCreator(payload) {
	return {
		type: GET_COURSES,
		payload,
	};
}

export function deleteCourseActionCreator(id) {
	return {
		type: DELETE_COURSE,
		payload: id,
	};
}

export function addCourseActionCreator(course) {
	return {
		type: ADD_COURSE,
		payload: course,
	};
}
