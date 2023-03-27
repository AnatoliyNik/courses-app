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
