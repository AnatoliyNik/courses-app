import {
	ADD_COURSE,
	DELETE_COURSE,
	GET_COURSES,
	UPDATE_COURSE,
} from './actionTypes';

const initialState = [];

export function coursesReducer(state = initialState, action) {
	switch (action.type) {
		case GET_COURSES:
			return [...action.payload];
		case DELETE_COURSE:
			return state.filter((course) => course.id !== action.payload);
		case ADD_COURSE:
			return [...state, action.payload];
		case UPDATE_COURSE:
			const newCourse = action.payload;
			const index = state.findIndex((course) => course.id === newCourse.id);
			const newState = [...state];

			newState.splice(index, 1, newCourse);

			return newState;
		default:
			return state;
	}
}
