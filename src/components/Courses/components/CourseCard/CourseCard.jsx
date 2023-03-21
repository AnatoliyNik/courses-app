import Button from '../../../../common/Button/Button';

import classes from './CourseCard.module.css';

import { SHOW_COURSE_BUTTON_TEXT } from '../../../../constants';

const CourseCard = (props) => {
	return (
		<article className={classes.CourseCard}>
			<div className={classes.description}>
				<h2>{props.title}</h2>
				<p>{props.description}</p>
			</div>
			<ul className={classes.info}>
				<li>
					<span className={classes.infoName}>authors:</span>
					<span className={classes.infoData}>{props.authors}</span>
				</li>
				<li>
					<span className={classes.infoName}>duration:</span>
					<span className={classes.infoData}>{props.duration}</span>
				</li>
				<li>
					<span className={classes.infoName}>created:</span>
					<span className={classes.infoData}>{props.creationDate}</span>
				</li>
				<li className={classes.button}>
					<Button buttonText={SHOW_COURSE_BUTTON_TEXT} />
				</li>
			</ul>
		</article>
	);
};

export default CourseCard;
