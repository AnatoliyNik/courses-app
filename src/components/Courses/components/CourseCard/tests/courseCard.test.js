import { renderWithReduxAndRouter } from '../../../../../tests/renderWithReduxAndRouter';

import CourseCard from '../CourseCard';

import { screen } from '@testing-library/react';

describe('CourseCard component', () => {
	test('should display title', () => {
		const title = 'test title';

		renderWithReduxAndRouter(<CourseCard title={title} />);

		expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(title);
	});

	test('should display description', () => {
		const description = 'test description';

		renderWithReduxAndRouter(<CourseCard description={description} />);

		expect(screen.getByText(description)).toBeInTheDocument();
	});

	test('should display duration in the correct format', () => {
		const duration = 100;

		renderWithReduxAndRouter(<CourseCard duration={duration} />);

		expect(screen.getByText('01:40 hours')).toBeInTheDocument();
	});

	test('should display authors list', () => {
		const courseAuthors = ['123', '456'];

		const state = {
			authors: [
				{ id: '123', name: 'name1' },
				{ id: '456', name: 'name2' },
			],
		};

		renderWithReduxAndRouter(<CourseCard authors={courseAuthors} />, state);

		expect(screen.getByText('name1, name2')).toBeInTheDocument();
	});

	test('should display created date in the correct format', () => {
		const date = new Date(2020, 10, 20).toLocaleDateString('en-GB');

		renderWithReduxAndRouter(<CourseCard creationDate={date} />);

		expect(screen.getByText('20.11.2020')).toBeInTheDocument();
	});
});
