import { ADD_COURSE, DELETE_COURSE, GET_COURSES } from './actionTypes';

export function getCourses_actionCreator(payload) {
	return {
		type: GET_COURSES,
		payload,
	};
}

export function deleteCourse_actionCreator(id) {
	return {
		type: DELETE_COURSE,
		payload: id,
	};
}

export function addCourse_actionCreator(course) {
	return {
		type: ADD_COURSE,
		payload: course,
	};
}
