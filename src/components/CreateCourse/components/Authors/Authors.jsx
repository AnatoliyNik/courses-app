import { useContext, useRef, useState } from 'react';

import classes from './Authors.module.css';

import {
	ADD_AUTHOR_BUTTON_TEXT,
	ADD_AUTHOR_TITLE_TEXT,
	AUTHOR_NAME_ERROR_MESSAGE,
	AUTHOR_NAME_LABEL_TEXT,
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

import { v4 as uuidv4 } from 'uuid';

import { AuthorContext } from '../../../../GlobalContext/GlobalContext';
import { CourseContext } from '../../CreateCourse';

const Authors = () => {
	const { duration, setDuration, courseAuthors, setCourseAuthors } =
		useContext(CourseContext);
	const { authors, setAuthors } = useContext(AuthorContext);

	const [authorName, setAuthorName] = useState('');
	const [isPristine, setIsPristine] = useState(true);
	const [showAuthorError, setShowAuthorError] = useState(false);
	const [showDurationError, setShowDurationError] = useState(false);
	const [authorList, setAuthorList] = useState([...authors]);

	const authorInput = useRef();

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
		const minLength = 2;
		let value = e.target.value.trim();

		setAuthorName(value);

		if (isPristine) {
			setIsPristine(false);
		}

		if (value.length < minLength) {
			setShowAuthorError(true);
		} else if (showAuthorError) {
			setShowAuthorError(false);
		}
	};

	const createAuthor = () => {
		if (authorName.length < 2) {
			return;
		}

		const newAuthor = {
			name: authorName,
			id: uuidv4(),
		};

		setAuthors([...authors, newAuthor]);
		setAuthorList([...authorList, newAuthor]);

		authorInput.current.value = '';
		setIsPristine(true);
	};

	const addAuthor = (author) => {
		setCourseAuthors([...courseAuthors, author]);

		setAuthorList(authorList.filter((a) => a !== author));
	};

	const deleteAuthor = (author) => {
		setAuthorList([...authorList, author]);

		setCourseAuthors(courseAuthors.filter((a) => a !== author));
	};

	return (
		<div className={classes.Authors}>
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
			</section>

			<section>
				<h5>{AUTHORS_TITLE_TEXT}</h5>
				<ul className={classes.authorList}>
					{authorList.length ? (
						authorList.map((author) => (
							<li key={author.id} className={classes.authorsItem}>
								<span>{author.name}</span>
								<Button
									onClick={() => addAuthor(author)}
									buttonText={ADD_AUTHOR_BUTTON_TEXT}
								/>
							</li>
						))
					) : (
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
				<ul className={classes.authorList}>
					{courseAuthors.length ? (
						courseAuthors.map((author) => (
							<li key={author.id} className={classes.authorsItem}>
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
