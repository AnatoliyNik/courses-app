export function pipeDuration(minutes) {
	minutes = parseInt(minutes);

	if (Number.isNaN(minutes)) {
		return '00:00';
	}

	let hours = Math.floor(minutes / 60);
	let min = minutes % 60;

	hours = hours < 10 ? '0' + hours : hours;
	min = min < 10 ? '0' + min : min;
	return `${hours}:${min}`;
}
