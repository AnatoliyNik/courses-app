import { ADD_AUTHOR, GET_AUTHORS } from './actionTypes';

export function getAuthorsActionCreator(payload) {
	return {
		type: GET_AUTHORS,
		payload,
	};
}

export function addAuthorActionCreator(author) {
	return {
		type: ADD_AUTHOR,
		payload: author,
	};
}
