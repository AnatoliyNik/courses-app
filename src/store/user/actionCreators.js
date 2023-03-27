import { LOGOUT, LOGIN_USER } from './actionTypes';

export function loginUserActionCreator(payload) {
	return {
		type: LOGIN_USER,
		payload,
	};
}

export function logoutUserActionCreator() {
	return {
		type: LOGOUT,
	};
}
