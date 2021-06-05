import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
	const { pagesCount, selectedPage, onPageChange } = props;

	if (pagesCount === 1) return null;

	//const pages = [...Array(pagesCount).keys()].map((m) => ++m);
	const pages = _.range(1, pagesCount + 1);

	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination">
				{pages.map((page) => (
					<li
						key={page}
						className={
							page === selectedPage
								? "page-item active"
								: "page-item"
						}
					>
						<button
							className="page-link"
							onClick={() => onPageChange(page)}
						>
							{page}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

Pagination.propTypes = {
	pagesCount: PropTypes.number.isRequired,
	selectedPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
