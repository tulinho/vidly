import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieDetails from "./components/movieDetails";
import LoginForm from "./components/loginForm";
import "./App.css";

function App() {
	return (
		<React.Fragment>
			<NavBar />
			<main className="container">
				<Switch>
					<Route path="/login" component={LoginForm} />
					<Route path="/movies/:id" component={MovieDetails} />
					<Route path="/movies" component={Movies} />
					<Route path="/customers" component={Customers} />
					<Route path="/rentals" component={Rentals} />
					<Route path="/not-found" component={NotFound} />
					<Route path="/" exact component={Movies} />
					<Redirect to="/not-found" />
				</Switch>
			</main>
		</React.Fragment>
	);
}

export default App;
