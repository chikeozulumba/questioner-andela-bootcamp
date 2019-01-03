const sortArrayById = (collection, id) => {
	id = parseInt(id, 10);
	for (let i = 0; i < collection.length; i += 1) {
		const col = collection[i];
		if (col.id === id) return col;
	}
	return null;
};

const Filters = { sortArrayById };

export default Filters;
