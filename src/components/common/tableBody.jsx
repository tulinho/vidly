import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
	renderCell(item, column) {
		if (column.content) return column.content(item);
		return _.get(item, column.path);
	}
	render() {
		const { data, columns, itemKey } = this.props;
		return (
			<tbody>
				{data.map((item) => (
					<tr key={_.get(item, itemKey)}>
						{columns.map((column) => (
							<td key={column.key}>
								{this.renderCell(item, column)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		);
	}
}

TableBody.defaultProps = {
	itemKey: "_id",
};

export default TableBody;
