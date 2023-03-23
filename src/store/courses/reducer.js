import { ADD_COURSE, DELETE_COURSE, GET_COURSES } from './actionTypes';

const initialState = [];

export function coursesReducer(state = initialState, action) {
	switch (action.type) {
		case GET_COURSES:
			return [...action.payload];
		case DELETE_COURSE:
			return state.filter((course) => course.id !== action.payload);
		case ADD_COURSE:
			return [...state, action.payload];
		default:
			return state;
	}
}
