import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
	const menuItems = [
		{ key: 1, label: "Movies", route: "/movies" },
		{ key: 2, label: "Customers", route: "/customers" },
		{ key: 3, label: "Rentals", route: "/rentals" },
		{ key: 4, label: "Login", route: "/login" },
		{ key: 5, label: "Register", route: "/register" },
	];
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
			<a className="navbar-brand" href="/">
				Vidly
			</a>
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav">
					{menuItems.map((item) => (
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
