import {
	mockedStore,
	renderWithReduxAndRouter,
} from '../../../tests/renderWithReduxAndRouter';

import Header from '../Header';

import { screen } from '@testing-library/react';

describe('Header component', () => {
	test("should have logo and user's name", () => {
		renderWithReduxAndRouter(<Header />);

		expect(screen.getByAltText('logo')).toBeInTheDocument();
		expect(
			screen.getByText(mockedStore.getState().user.name)
		).toBeInTheDocument();
	});
});
