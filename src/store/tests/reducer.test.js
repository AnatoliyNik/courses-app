import { coursesReducer } from '../courses/reducer';

import {
	addCourseActionCreator,
	getCoursesActionCreator,
} from '../courses/actionCreators';

describe('courseReducer', () => {
	test('should return the initial state', () => {
		const state = undefined;

		const action = {
			type: undefined,
		};

		expect(coursesReducer(state, action)).toStrictEqual([]);
	});

	test('should handle ADD_COURSE and returns new state', () => {
		const state = [
			{ id: 1, title: 'title 1' },
			{ id: 2, title: 'title 2' },
		];

		const newCourse = { id: 3, title: 'title 3' };

		expect(
			coursesReducer(state, addCourseActionCreator(newCourse))
		).toStrictEqual([
			{ id: 1, title: 'title 1' },
			{ id: 2, title: 'title 2' },
			{ id: 3, title: 'title 3' },
		]);

		expect(coursesReducer(state, addCourseActionCreator(newCourse))).not.toBe(
			state
		);
	});

	test('should handle GET_COURSES and returns new state', () => {
		const state = [
			{ id: 1, title: 'title 1' },
			{ id: 2, title: 'title 2' },
		];

		const payload = [
			{ id: 3, title: 'title 3' },
			{ id: 4, title: 'title 4' },
		];

		expect(
			coursesReducer(state, getCoursesActionCreator(payload))
		).toStrictEqual([
			{ id: 3, title: 'title 3' },
			{ id: 4, title: 'title 4' },
		]);

		expect(coursesReducer(state, getCoursesActionCreator(payload))).not.toBe(
			state
		);
	});
});
