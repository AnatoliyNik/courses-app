import { createContext, useState } from 'react';
import { mockedAuthorsList, mockedCoursesList } from '../constants';

export const AuthorContext = createContext(null);

const GlobalContext = ({ children }) => {
	const [isShowCreateCourse, setIsShowCreateCourse] = useState(false);
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [courses, setCourses] = useState(mockedCoursesList);

	return (
		<AuthorContext.Provider
			value={{
				isShowCreateCourse,
				setIsShowCreateCourse,
				authors,
				setAuthors,
				courses,
				setCourses,
			}}
		>
			{children}
		</AuthorContext.Provider>
	);
};

export default GlobalContext;
