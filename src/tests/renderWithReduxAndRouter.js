import { render } from '@testing-library/react';

import { Provider } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		role: 'user',
	},
	courses: [],
	authors: [],
};

export const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

export const renderWithReduxAndRouter = (
	component,
	state = mockedState,
	initialPath = ''
) => {
	mockedStore.getState = () => ({
		...mockedState,
		...state,
	});

	return render(
		<Provider store={mockedStore}>
			<MemoryRouter initialEntries={[initialPath]}>{component}</MemoryRouter>
		</Provider>
	);
};
