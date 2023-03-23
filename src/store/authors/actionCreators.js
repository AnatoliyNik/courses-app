import { ADD_AUTHOR, GET_AUTHORS } from './actionTypes';

export function getAuthors_actionCreator(payload) {
	return {
		type: GET_AUTHORS,
		payload,
	};
}

export function addAuthor_actionCreator(author) {
	return {
		type: ADD_AUTHOR,
		payload: author,
	};
}
