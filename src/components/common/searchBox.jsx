import React from "react";

const SearchBox = ({ placeHolder, onChange, ...rest }) => {
	return (
		<input
			className="form-control my-2"
			name="search"
			type="text"
			placeholder={placeHolder}
			onChange={({ currentTarget: input }) => onChange(input.value)}
			{...rest}
		/>
	);
};

export default SearchBox;
