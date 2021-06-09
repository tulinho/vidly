import React from "react";
import PropTypes from "prop-types";

const Input = ({ name, label, error, ...rest }) => {
	return (
		<div className="form-group  my-2">
			<label htmlFor={name}>{label}</label>
			<input id={name} name={name} {...rest} className="form-control" />
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

Input.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
};

export default Input;
