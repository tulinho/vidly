import React from "react";
import "./like.css";
import PropTypes from "prop-types";

const Like = (props) => {
	const { liked, onClick } = props;
	let classes = "like fa fa-heart";
	if (!liked) classes += "-o";
	return <i className={classes} onClick={onClick}></i>;
};

Like.propTypes = {
	liked: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
};

export default Like;
