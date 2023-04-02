export function dateGeneratop(date) {
	date = date?.split('/').reverse().join('/');

	return new Date(date).toLocaleDateString();
}
