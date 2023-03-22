export function getAuthors(arrayId, listOfAuthors) {
	return getArrayOfAuthors(arrayId, listOfAuthors).join(', ');
}

export function getArrayOfAuthors(arrayId, listOfAuthors) {
	return arrayId?.map((id) => getAuthorById(id, listOfAuthors));
}

function getAuthorById(id, listOfAuthors) {
	return listOfAuthors.find((author) => author.id === id)?.name;
}
