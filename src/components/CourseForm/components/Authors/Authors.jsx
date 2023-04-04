import { useContext, useRef, useState, useEffect } from 'react';

import classes from './Authors.module.css';

import {
	ADD_AUTHOR_BUTTON_TEXT,
	ADD_AUTHOR_TITLE_TEXT,
	AUTHOR_NAME_ERROR_MESSAGE,
	AUTHOR_NAME_LABEL_TEXT,
	AUTHOR_NAME_MIN_LENGTH,
	AUTHORS_TITLE_TEXT,
	COURSE_AUTHORS_TITLE_TEXT,
	CREATE_AUTHOR_BUTTON_TEXT,
	DELETE_AUTHOR_BUTTON_TEXT,
	DURATION_ERROR_MESSAGE,
	DURATION_LABEL_TEXT,
	DURATION_TITLE_TEXT,
	EMPTY_AUTHORS_lIST_MESSAGE,
	ENTER_AUTHOR_NAME_PLACEHOLDER_TEXT,
	ENTER_DURATION_IN_MINUTES_PLACEHOLDER_TEXT,
} from '../../../../constants';

import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { pipeDuration } from '../../../../helpers/pipeDuration';

import { CourseContext } from '../../CourseForm';

import { useDispatch, useSelector } from 'react-redux';

import {
	getAuthorsSelector,
	getUserSelector,
} from '../../../../store/selectors';

import { addAuthorAsyncActionCreator } from '../../../../store/authors/thunk';
import { useFetching } from '../../../../hooks/useFetching';
import Loader from '../../../Loader/Loader';

import {
	AUTHOR_TEST_ID,
	AUTHORS_CONTAINER_TEST_ID,
	COURSE_AUTHOR_TEST_ID,
	COURSE_AUTHORS_CONTAINER_TEST_ID,
} from '../../../../tests/constants';

const Authors = () => {
	const { duration, setDuration, courseAuthors, setCourseAuthors } =
		useContext(CourseContext);

	const user = useSelector(getUserSelector);
	const authors = useSelector(getAuthorsSelector);
	const dispatch = useDispatch();

	const [authorName, setAuthorName] = useState('');
	const [isPristine, setIsPristine] = useState(true);
	const [showAuthorError, setShowAuthorError] = useState(false);
	const [showDurationError, setShowDurationError] = useState(false);

	const [fetching, isLoading, error] = useFetching((author, token) =>
		dispatch(addAuthorAsyncActionCreator(author, token))
	);

	const authorInput = useRef();

	const [endOfFetching, setEndOfFetching] = useState(false);

	useEffect(() => {
		if (endOfFetching && !error.message) {
			authorInput.current.value = '';
			setIsPristine(true);
		}
	}, [endOfFetching, error]);

	const changeDuration = (e) => {
		const target = e.target;
		const value = e.nativeEvent.data;
		const regexp = /\D/;

		if (regexp.test(value) && value !== null) {
			target.value = duration || '';
			return;
		}

		if (target.value === '') {
			setDuration(0);

			if (!showDurationError) {
				setShowDurationError(true);
			}

			return;
		}

		if (Number(target.value) === 0 && !showDurationError) {
			setShowDurationError(true);
		}

		if (Number(target.value) !== 0 && showDurationError) {
			setShowDurationError(false);
		}

		setDuration(Number(target.value));
	};

	const changeAuthorName = (e) => {
		let value = e.target.value.trim();

		setAuthorName(value);

		if (isPristine) {
			setIsPristine(false);
		}

		if (value.length < AUTHOR_NAME_MIN_LENGTH) {
			setShowAuthorError(true);
		} else if (showAuthorError) {
			setShowAuthorError(false);
		}
	};

	const createAuthor = async () => {
		if (authorName.length < AUTHOR_NAME_MIN_LENGTH) {
			return;
		}

		const newAuthor = {
			name: authorName,
		};

		setEndOfFetching(false);

		await fetching(newAuthor, user.token);

		setEndOfFetching(true);
	};

	const addAuthor = (author) => {
		setCourseAuthors([...courseAuthors, author]);
	};

	const deleteAuthor = (author) => {
		setCourseAuthors(courseAuthors.filter((a) => a !== author));
	};

	return (
		<div className={classes.Authors}>
			{isLoading && <Loader />}
			<section>
				<h5>{ADD_AUTHOR_TITLE_TEXT}</h5>
				<Input
					ref={authorInput}
					onChange={changeAuthorName}
					labelText={AUTHOR_NAME_LABEL_TEXT}
					placeholderText={ENTER_AUTHOR_NAME_PLACEHOLDER_TEXT}
				/>
				{showAuthorError && (
					<small className={classes.error}>{AUTHOR_NAME_ERROR_MESSAGE}</small>
				)}
				<p className={classes.addAuthor}>
					<Button
						disabled={showAuthorError || isPristine}
						onClick={createAuthor}
						buttonText={CREATE_AUTHOR_BUTTON_TEXT}
					/>
				</p>

				{error.message && <p className={classes.error}>{error.message}</p>}
			</section>

			<section>
				<h5>{AUTHORS_TITLE_TEXT}</h5>
				<ul
					data-testid={AUTHORS_CONTAINER_TEST_ID}
					className={classes.authorList}
				>
					{authors
						.filter((a) => !courseAuthors.includes(a))
						.map((author) => (
							<li
								data-testid={AUTHOR_TEST_ID}
								key={author.id}
								className={classes.authorsItem}
							>
								<span>{author.name}</span>
								<Button
									onClick={() => addAuthor(author)}
									buttonText={ADD_AUTHOR_BUTTON_TEXT}
								/>
							</li>
						))}

					{courseAuthors.length === authors.length && (
						<p className={classes.message}>{EMPTY_AUTHORS_lIST_MESSAGE}</p>
					)}
				</ul>
			</section>

			<section>
				<h5>{DURATION_TITLE_TEXT}</h5>
				<Input
					labelText={DURATION_LABEL_TEXT}
					placeholderText={ENTER_DURATION_IN_MINUTES_PLACEHOLDER_TEXT}
					onChange={changeDuration}
					value={String(duration)}
				/>

				{showDurationError && (
					<small className={classes.error}>{DURATION_ERROR_MESSAGE}</small>
				)}

				<p className={classes.duration}>
					Duration:{' '}
					<span className={classes.time}>{pipeDuration(duration)}</span> hours
				</p>
			</section>

			<section>
				<h5>{COURSE_AUTHORS_TITLE_TEXT}</h5>
				<ul
					data-testid={COURSE_AUTHORS_CONTAINER_TEST_ID}
					className={classes.authorList}
				>
					{courseAuthors.length ? (
						courseAuthors.map((author) => (
							<li
								data-testid={COURSE_AUTHOR_TEST_ID}
								key={author.id}
								className={classes.authorsItem}
							>
								<span>{author.name}</span>
								<Button
									onClick={() => deleteAuthor(author)}
									buttonText={DELETE_AUTHOR_BUTTON_TEXT}
								/>
							</li>
						))
					) : (
						<p className={classes.message}>{EMPTY_AUTHORS_lIST_MESSAGE}</p>
					)}
				</ul>
			</section>
		</div>
	);
};

export default Authors;
