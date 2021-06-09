import React from "react";
import PropTypes from "prop-types";

const Select = ({
	name,
	label,
	error,
	options,
	itemValue,
	itemText,
	...rest
}) => {
	return (
		<div className="form-group my-2">
			<label htmlFor={name}>{label}</label>
			<select name={name} id={name} {...rest} className="form-control">
				{options.map((option) => (
					<option key={option[itemValue]} value={option[itemValue]}>
						{option[itemText]}
					</option>
				))}
			</select>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

Select.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
};

Select.defaultProps = {
	itemValue: "_id",
	itemText: "name",
};

export default Select;
