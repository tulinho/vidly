import _ from "lodash"; // underscore

function paginate(items, page, pageSize) {
	var pg = page || 1,
		pgSize = pageSize || 10,
		offset = (pg - 1) * pgSize,
		pagedItems = _.drop(items, offset).slice(0, pgSize);
	return {
		page: pg,
		pageSize: pgSize,
		total: items.length,
		totalPages: Math.ceil(items.length / pgSize),
		pagedItems: pagedItems,
	};
}

export default paginate;
