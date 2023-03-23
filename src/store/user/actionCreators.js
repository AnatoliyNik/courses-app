import { LOGOUT, LOGIN_USER } from './actionTypes';

export function loginUser_actionCreator(payload) {
	return {
		type: LOGIN_USER,
		payload,
	};
}

export function logoutUser_actionCreator() {
	return {
		type: LOGOUT,
	};
}
