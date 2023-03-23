import { LOGOUT, LOGIN_USER } from './actionTypes';

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export function userReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN_USER:
			localStorage.setItem('user', JSON.stringify(action.payload));
			return {
				...state,
				...action.payload,
				isAuth: true,
			};
		case LOGOUT:
			localStorage.removeItem('user');
			return {
				...initialState,
			};
		default:
			return state;
	}
}
