import React from "react";
import "./listGroup.css";

const ListGroup = (props) => {
	const { items, itemKey, itemValue, selectedItem, onSelect } = props;
	return (
		<ul className="list-group">
			{items.map((item) => (
				<li
					key={item[itemKey]}
					className={
						item[itemKey] === selectedItem[itemKey]
							? "selectable-list-group-item list-group-item active"
							: "selectable-list-group-item list-group-item"
					}
					onClick={() => onSelect(item)}
				>
					{item[itemValue]}
				</li>
			))}
		</ul>
	);
};

ListGroup.defaultProps = {
	itemKey: "_id",
	itemValue: "name",
};

export default ListGroup;
