import axios from 'axios';

export const getAllCourses = () => {
	return axios('http://localhost:4000/courses/all');
};

export const getAllAuthors = () => {
	return axios('http://localhost:4000/authors/all');
};

export const register = (user) => {
	return axios.post('http://localhost:4000/register', user, {
		headers: { 'Content-Type': 'application/json' },
	});
};

export const login = (user) => {
	return axios.post('http://localhost:4000/login', user, {
		headers: { 'Content-Type': 'application/json' },
	});
};

export const logout = (token) => {
	return axios.delete('http://localhost:4000/logout', {
		headers: {
			Authorization: token,
		},
	});
};

export const getInfoAboutUser = (token) => {
	return axios('http://localhost:4000/users/me', {
		headers: {
			Authorization: token,
		},
	});
};

export const deleteCourse = (id, token) => {
	return axios.delete(`http://localhost:4000/courses/${id}`, {
		headers: {
			Authorization: token,
		},
	});
};

export const addAuthor = (author, token) => {
	return axios.post('http://localhost:4000/authors/add', author, {
		headers: {
			Authorization: token,
		},
	});
};

export const updateCourse = (id, course, token) => {
	return axios.put(`http://localhost:4000/courses/${id}`, course, {
		headers: {
			Authorization: token,
		},
	});
};

export const addCourse = (course, token) => {
	return axios.post('http://localhost:4000/courses/add', course, {
		headers: {
			Authorization: token,
		},
	});
};
