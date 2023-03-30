import { getInfoAboutUser, logout } from '../../services';
import {
	loginUserActionCreator,
	logoutUserActionCreator,
} from './actionCreators';

export const logoutUserAsyncActionCreator = (token) => async (dispatch) => {
	await logout(token);
	dispatch(logoutUserActionCreator());
};

export const getUserDataAsyncActionCreator = (token) => async (dispatch) => {
	try {
		const response = await getInfoAboutUser(token);

		const { name, email, role } = response.data.result;

		const userData = {
			token,
			name,
			email,
			role,
		};

		dispatch(loginUserActionCreator(userData));
	} catch (e) {
		return e;
	}
};
