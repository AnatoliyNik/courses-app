export const mockedCoursesList = [
	{
		id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
		title: 'JavaScript',
		description: `Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum
has been the industry's standard dummy text ever since the
1500s, when an unknown
printer took a galley of type and scrambled it to make a type
specimen book. It has survived
not only five centuries, but also the leap into electronic typesetting, remaining essentially u
nchanged.`,
		creationDate: '8/3/2021',
		duration: 160,
		authors: [
			'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			'f762978b-61eb-4096-812b-ebde22838167',
		],
	},
	{
		id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
		title: 'Angular',
		description: `Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum
has been the industry's standard dummy text ever since the
1500s, when an unknown
printer took a galley of type and scrambled it to make a type
specimen book.`,
		creationDate: '10/11/2020',
		duration: 210,
		authors: [
			'df32994e-b23d-497c-9e4d-84e4dc02882f',
			'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		],
	},
];

export const mockedAuthorsList = [
	{
		id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
		name: 'Vasiliy Dobkin',
	},
	{
		id: 'f762978b-61eb-4096-812b-ebde22838167',
		name: 'Nicolas Kim',
	},
	{
		id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
		name: 'Anna Sidorenko',
	},
	{
		id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		name: 'Valentina Larina',
	},
];

export const PASSWORD_MIN_LENGTH = 6;
export const DESCRIPTION_MIN_LENGTH = 2;
export const AUTHOR_NAME_MIN_LENGTH = 2;

export const LOGOUT_BUTTON_TEXT = 'Logout';
export const SEARCH_BUTTON_TEXT = 'Search';
export const ADD_NEW_COURSE_BUTTON_TEXT = 'Add new course';
export const ADD_AUTHOR_BUTTON_TEXT = 'Add author';
export const SHOW_COURSE_BUTTON_TEXT = 'Show course';
export const CREATE_COURSE_BUTTON_TEXT = 'Create course';
export const UPDATE_COURSE_BUTTON_TEXT = 'Update course';
export const CREATE_AUTHOR_BUTTON_TEXT = 'Create author';
export const DELETE_AUTHOR_BUTTON_TEXT = 'Delete author';
export const REGISTRATION_BUTTON_TEXT = 'Registration';
export const LOGIN_BUTTON_TEXT = 'Login';
export const COURSEINFO_BUTTON_TEXT = '< Back to courses';

export const SEARCH_PLACEHOLDER_TEXT = 'Enter course name...';
export const ENTER_AUTHOR_NAME_PLACEHOLDER_TEXT = 'Enter author name...';
export const ENTER_TITLE_PLACEHOLDER_TEXT = 'Enter title...';
export const ENTER_DESCRIPTION_PLACEHOLDER_TEXT = 'Enter description';
export const ENTER_DURATION_IN_MINUTES_PLACEHOLDER_TEXT =
	'Enter duration in minutes...';
export const REGISTRATION_ENTER_NAME_PLACEHOLDER_TEXT = 'Enter name';
export const REGISTRATION_ENTER_EMAIL_PLACEHOLDER_TEXT = 'Enter email';
export const REGISTRATION_ENTER_PASSWORD_PLACEHOLDER_TEXT = 'Enter password';
export const LOGIN_ENTER_EMAIL_PLACEHOLDER_TEXT = 'Enter email';
export const LOGIN_ENTER_PASSWORD_PLACEHOLDER_TEXT = 'Enter password';

export const TITLE_LABEL_TEXT = 'Title';
export const DESCRIPTION_LABEL_TEXT = 'Description';
export const AUTHOR_NAME_LABEL_TEXT = 'Author name';
export const DURATION_LABEL_TEXT = 'Duration';
export const REGISTRATION_NAME_LABEL_TEXT = 'Name';
export const REGISTRATION_EMAIL_LABEL_TEXT = 'Email';
export const REGISTRATION_PASSWORD_LABEL_TEXT = 'Password';
export const LOGIN_EMAIL_LABEL_TEXT = 'Email';
export const LOGIN_PASSWORD_LABEL_TEXT = 'Password';

export const ADD_AUTHOR_TITLE_TEXT = 'Add author';
export const AUTHORS_TITLE_TEXT = 'Authors';
export const DURATION_TITLE_TEXT = 'Duration';
export const COURSE_AUTHORS_TITLE_TEXT = 'Course authors';
export const REGISTRATION_TITLE_TEXT = 'Registration';
export const LOGIN_TITLE_TEXT = 'Login';

export const EMPTY_AUTHORS_lIST_MESSAGE = 'Author list is empty';
export const FILL_ALERT_MESSAGE = 'Please, fill in all fields';
export const NO_COURSE_FOUND_MESSAGE = 'No course found';
export const NOT_FOUND_MESSAGE = 'Not found';
export const CONFIRM_DELETION_MESSAGE = 'Confirm deletion';

export const DURATION_ERROR_MESSAGE = 'Duration should be more than 0 minute';
export const DESCRIPTION_ERROR_MESSAGE = `Description should be at least ${DESCRIPTION_MIN_LENGTH} characters`;
export const AUTHOR_NAME_ERROR_MESSAGE = `Author name should be at least ${AUTHOR_NAME_MIN_LENGTH} characters`;

export const REGISTRATION_ROUTE = '/registration';
export const LOGIN_ROUTE = '/login';
export const COURSES_ROUTE = '/courses';
export const COURSE_INFO_ROUTE = '/courses/:courseId';
export const CREATE_COURSE_ROUTE = '/courses/add';
export const UPDATE_COURSE_ROUTE = '/courses/update/:courseId';
export const UPDATE_COURSE_WITHOUT_ID_ROUTE = '/courses/update/';

export const ADMIN_ROLE = 'admin';
