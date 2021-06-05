import React, { Component } from "react";
import PropTypes from "prop-types";
import "./tableHeader.css";

class TableHeader extends Component {
	raiseSort = (columnPath) => {
		const { path, order } = this.props.sortColumn;
		let sortColumn = { path: columnPath, order: "asc" };
		if (columnPath !== path) {
			this.props.onSort(sortColumn);
			return;
		}
		if (order === sortColumn.order) sortColumn.order = "desc";
		this.props.onSort(sortColumn);
	};
	renderSortIcon(column) {
		const { sortColumn } = this.props;
		if (column.path !== sortColumn.path) return null;
		if (sortColumn.order === "asc")
			return <i className="fa fa-sort-asc"></i>;
		return <i className="fa fa-sort-desc"></i>;
	}
	render() {
		const { columns } = this.props;
		return (
			<thead>
				<tr>
					{columns.map((column) => (
						<th
							key={column.key}
							className="table-header-column"
							onClick={() => this.raiseSort(column.path)}
						>
							{column.title} {this.renderSortIcon(column)}
						</th>
					))}
				</tr>
			</thead>
		);
	}
}

TableHeader.propTypes = {
	columns: PropTypes.array.isRequired,
	onSort: PropTypes.func.isRequired,
	sortColumn: PropTypes.object.isRequired,
};

export default TableHeader;
