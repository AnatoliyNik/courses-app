import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { getUserSelector } from '../../store/selectors';

import { Navigate } from 'react-router-dom';

import { ADMIN_ROLE, COURSES_ROUTE } from '../../constants';

const PrivateRoute = ({ children }) => {
	const user = useSelector(getUserSelector);

	if (user.role !== ADMIN_ROLE) {
		return <Navigate to={COURSES_ROUTE} replace />;
	}

	return children;
};

PrivateRoute.propTypes = {
	children: PropTypes.element.isRequired,
};

export default PrivateRoute;
