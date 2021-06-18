import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";

class MoviesTable extends Component {
	render() {
		const { movies, sortColumn, onLike, onDelete, onSort } = this.props;
		const columns = this.getColumns(onLike, onDelete);
		return (
			<Table
				columns={columns}
				sortColumn={sortColumn}
				data={movies}
				onSort={onSort}
			/>
		);
	}

	getColumns(onLike, onDelete) {
		const user = auth.getCurrentUser();
		let columns = [
			{
				key: 1,
				path: "title",
				title: "Title",
				content: (movie) => (
					<Link to={`/movies/${movie._id}`}>{movie.title}</Link>
				),
			},
			{ key: 2, path: "genre.name", title: "Genre" },
			{ key: 3, path: "numberInStock", title: "Stock" },
			{ key: 4, path: "dailyRentalRate", title: "Rate" },
			{
				key: 5,
				content: (movie) => (
					<Like
						liked={movie.liked}
						onClick={() => {
							onLike(movie);
						}}
					/>
				),
			},
		];
		if (user && user.isAdmin)
			columns.push({
				key: 6,
				content: (movie) => (
					<button
						className="btn btn-danger"
						onClick={() => {
							onDelete(movie);
						}}
					>
						Delete
					</button>
				),
			});
		return columns;
	}
}

export default MoviesTable;
