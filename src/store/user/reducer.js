import { LOGOUT, LOGIN_USER } from './actionTypes';

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

export function userReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN_USER:
			localStorage.setItem('token', JSON.stringify(action.payload.token));
			return {
				...state,
				...action.payload,
				isAuth: true,
			};
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...initialState,
			};
		default:
			return state;
	}
}
