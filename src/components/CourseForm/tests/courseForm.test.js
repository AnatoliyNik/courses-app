import {
	mockedStore,
	renderWithReduxAndRouter,
} from '../../../tests/renderWithReduxAndRouter';

import CourseForm from '../CourseForm';

import { fireEvent, screen, waitFor, within } from '@testing-library/react';

import {
	ADD_AUTHOR_BUTTON_TEXT,
	CREATE_AUTHOR_BUTTON_TEXT,
	DELETE_AUTHOR_BUTTON_TEXT,
	ENTER_AUTHOR_NAME_PLACEHOLDER_TEXT,
} from '../../../constants';

import {
	AUTHOR_TEST_ID,
	AUTHORS_CONTAINER_TEST_ID,
	COURSE_AUTHOR_TEST_ID,
	COURSE_AUTHORS_CONTAINER_TEST_ID,
} from '../../../tests/constants';

describe('CourseForm component', () => {
	beforeEach(() => {
		const state = {
			authors: [
				{ id: '123', name: 'name1' },
				{ id: '456', name: 'name2' },
				{ id: '321', name: 'name3' },
				{ id: '654', name: 'name4' },
			],
		};

		renderWithReduxAndRouter(<CourseForm />, state);
	});

	test('should show authors lists (all and course authors)', () => {
		expect(screen.getByTestId(AUTHORS_CONTAINER_TEST_ID)).toBeInTheDocument();

		expect(
			screen.getByTestId(COURSE_AUTHORS_CONTAINER_TEST_ID)
		).toBeInTheDocument();

		expect(screen.getAllByTestId(AUTHOR_TEST_ID).length).toBe(
			mockedStore.getState().authors.length
		);

		expect(screen.queryAllByTestId(COURSE_AUTHOR_TEST_ID).length).toBe(0);
	});

	test("'Create author' click button should call dispatch", async () => {
		const btn = screen.getByText(CREATE_AUTHOR_BUTTON_TEXT);
		const input = screen.getByPlaceholderText(
			ENTER_AUTHOR_NAME_PLACEHOLDER_TEXT
		);

		fireEvent.change(input, { target: { value: 'name' } });
		fireEvent.click(btn);

		await waitFor(() => expect(mockedStore.dispatch).toBeCalledTimes(1));
	});

	test("'Add author' button click should add an author to course authors list", () => {
		expect(screen.queryAllByTestId(COURSE_AUTHOR_TEST_ID).length).toBe(0);

		addBtnClick();

		expect(screen.getAllByTestId(COURSE_AUTHOR_TEST_ID).length).toBe(1);
	});

	test("'Delete author' button click should delete an author from the course list", () => {
		addBtnClick();

		expect(screen.getAllByTestId(COURSE_AUTHOR_TEST_ID).length).toBe(1);

		const delBtn = screen.getByText(DELETE_AUTHOR_BUTTON_TEXT);

		fireEvent.click(delBtn);

		expect(screen.queryAllByTestId(COURSE_AUTHOR_TEST_ID).length).toBe(0);
	});
});

function addBtnClick() {
	const addBtn = within(screen.getAllByTestId(AUTHOR_TEST_ID)[0]).getAllByText(
		ADD_AUTHOR_BUTTON_TEXT
	)[0];

	fireEvent.click(addBtn);
}
