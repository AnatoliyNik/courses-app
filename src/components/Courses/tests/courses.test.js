import { renderWithReduxAndRouter } from '../../../tests/renderWithReduxAndRouter';

import Courses from '../Courses';
import CourseForm from '../../CourseForm/CourseForm';

import { fireEvent, screen } from '@testing-library/react';

import {
	ADD_NEW_COURSE_BUTTON_TEXT,
	COURSES_ROUTE,
	CREATE_COURSE_ROUTE,
	NO_COURSE_FOUND_MESSAGE,
} from '../../../constants';

import { Route, Routes } from 'react-router-dom';

import {
	COURSE_CARD_TEST_ID,
	COURSE_FORM_TEST_ID,
} from '../../../tests/constants';

describe('Courses component', () => {
	test('should display amount of CourseCard equal length of courses array', async () => {
		const state = {
			courses: [{ id: '1' }, { id: '2' }, { id: '3' }],
		};

		renderWithReduxAndRouter(<Courses />, state);

		const courses = await screen.findAllByTestId(COURSE_CARD_TEST_ID);

		expect(courses.length).toBe(state.courses.length);
	});

	test('should display empty container if courses array length is 0', async () => {
		const state = {
			courses: [],
		};

		renderWithReduxAndRouter(<Courses />, state);

		expect(
			await screen.findByText(NO_COURSE_FOUND_MESSAGE)
		).toBeInTheDocument();
	});

	test('CourseForm should be showed after a click on a button "Add new course"', () => {
		const state = {
			user: {
				role: 'admin',
			},
		};

		renderWithReduxAndRouter(
			<Routes>
				<Route path={CREATE_COURSE_ROUTE} element={<CourseForm />} />
				<Route path={COURSES_ROUTE} element={<Courses />} />
			</Routes>,
			state,
			COURSES_ROUTE
		);

		const btn = screen.getByText(ADD_NEW_COURSE_BUTTON_TEXT);

		fireEvent.click(btn);

		expect(screen.getByTestId(COURSE_FORM_TEST_ID)).toBeInTheDocument();
	});
});
