import _ from "lodash"; // underscore

function paginate(items, selectedPage, pageSize) {
	var page = selectedPage || 1,
		pgSize = pageSize || 10,
		offset = (page - 1) * pgSize,
		pagedItems = _.drop(items, offset).slice(0, pgSize);
	return {
		selectedPage: page,
		pageSize: pgSize,
		totalItems: items.length,
		totalPages: Math.ceil(items.length / pgSize),
		pagedItems: pagedItems,
	};
}

export default paginate;
