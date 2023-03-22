import classes from './Loader.module.css';

const Loader = () => {
	return (
		<div className={classes.Loader}>
			<div className={classes.spinner} />
		</div>
	);
};

export default Loader;
