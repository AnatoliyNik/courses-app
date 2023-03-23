import { combineReducers, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import { authorsReducer } from './authors/reducer';
import { coursesReducer } from './courses/reducer';
import { userReducer } from './user/reducer';

const rootReducer = combineReducers({
	authors: authorsReducer,
	courses: coursesReducer,
	user: userReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
