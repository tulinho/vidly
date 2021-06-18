import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
	const menuItems = [
		{ key: 1, label: "Movies", route: "/movies", show: !!user },
		{ key: 2, label: "Customers", route: "/customers", show: !!user },
		{ key: 3, label: "Rentals", route: "/rentals", show: !!user },
		{ key: 4, label: "Login", route: "/login", show: !user },
		{ key: 5, label: "Register", route: "/register", show: !user },
		{ key: 6, label: user?.name || "", route: "/profile", show: !!user },
		{ key: 7, label: "Logout", route: "/logout", show: !!user },
	];
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
			<a className="navbar-brand" href="/">
				Vidly
			</a>
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav">
					{menuItems
						.filter((m) => m.show)
						.map((item) => (
							<li key={item.key} className="nav-item">
								<NavLink className="nav-link" to={item.route}>
									{item.label}
								</NavLink>
							</li>
						))}
				</ul>
			</div>
		</nav>
	);
};

export default NavBar;
