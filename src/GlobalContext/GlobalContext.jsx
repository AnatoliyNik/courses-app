import { createContext, useEffect, useState } from 'react';

import { mockedAuthorsList, mockedCoursesList } from '../constants';

import PropTypes from 'prop-types';

export const AuthorContext = createContext(null);

const GlobalContext = ({ children }) => {
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [courses, setCourses] = useState(mockedCoursesList);
	const [user, setUser] = useState({});

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));

		if (user) {
			setUser(user);
		}
	}, []);

	return (
		<AuthorContext.Provider
			value={{
				authors,
				setAuthors,
				courses,
				setCourses,
				user,
				setUser,
			}}
		>
			{children}
		</AuthorContext.Provider>
	);
};

GlobalContext.propTypes = {
	children: PropTypes.element,
};

export default GlobalContext;
