import React from "react";
import { Redirect, Route } from "react-router";
import auth from "../../services/authService";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => (
				<React.Fragment>
					{!auth.getCurrentUser() && (
						<Redirect
							to={{
								pathname: "/login",
								state: { from: props.location },
							}}
						/>
					)}
					{auth.getCurrentUser() &&
						(Component ? <Component {...props} /> : render(props))}
				</React.Fragment>
			)}
		/>
	);
};

export default ProtectedRoute;
