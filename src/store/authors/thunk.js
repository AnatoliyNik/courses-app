import { addAuthor, getAllAuthors } from '../../services';
import {
	addAuthorActionCreator,
	getAuthorsActionCreator,
} from './actionCreators';

export const addAuthorAsyncActionCreator =
	(author, token) => async (dispatch) => {
		const response = await addAuthor(author, token);

		dispatch(addAuthorActionCreator(response.data.result));
	};

export const getAuthorsAsyncActionCreator = () => async (dispatch) => {
	const res = await getAllAuthors();

	dispatch(getAuthorsActionCreator(res.data.result));
};
