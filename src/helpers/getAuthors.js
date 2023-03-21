export function getAuthors(arrayId, listOfAuthors) {
	return arrayId.map((id) => getAuthorById(id, listOfAuthors)).join(', ');
}

function getAuthorById(id, listOfAuthors) {
	return listOfAuthors.find((author) => author.id === id)?.name;
}
