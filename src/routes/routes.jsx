import { Navigate } from 'react-router-dom';

import Login from '../components/Login/Login';
import Registration from '../components/Registration/Registration';
import Courses from '../components/Courses/Courses';
import CourseInfo from '../components/CourseInfo/CourseInfo';
import CourseForm from '../components/CourseForm/CourseForm';

import {
	COURSE_INFO_ROUTE,
	COURSES_ROUTE,
	CREATE_COURSE_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	UPDATE_COURSE_ROUTE,
} from '../constants';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

export const publicRoutes = [
	{ path: REGISTRATION_ROUTE, element: <Registration /> },
	{ path: LOGIN_ROUTE, element: <Login /> },
	{ path: '*', element: <Navigate to={LOGIN_ROUTE} replace /> },
];

export const privateRoutes = [
	{ path: COURSES_ROUTE, element: <Courses /> },
	{ path: COURSE_INFO_ROUTE, element: <CourseInfo /> },
	{
		path: CREATE_COURSE_ROUTE,
		element: (
			<PrivateRoute>
				<CourseForm />
			</PrivateRoute>
		),
	},
	{
		path: UPDATE_COURSE_ROUTE,
		element: (
			<PrivateRoute>
				<CourseForm />
			</PrivateRoute>
		),
	},
	{ path: '*', element: <Navigate to={COURSES_ROUTE} replace /> },
];
