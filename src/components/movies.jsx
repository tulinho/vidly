import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import paginate from "../paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		selectedPage: 1,
		selectedGenre: "",
		pageSize: 4,
	};
	componentDidMount() {
		this.setState({
			movies: getMovies(),
			genres: getGenres(),
		});
	}
	handleSelect = (genre) => {
		this.setState({ selectedGenre: genre, selectedPage: 1 });
	};
	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const selectedMovie = movies.find((m) => m._id === movie._id);
		selectedMovie.liked = !selectedMovie.liked;
		this.setState({ movies });
	};
	handleDelete = (movie) => {
		const movies = this.state.movies.filter(
			(item) => item._id !== movie._id
		);
		this.setState({ movies });
	};
	handlePageChange = (selectedPage) => {
		this.setState({ selectedPage });
	};
	render() {
		const {
			movies: allMovies,
			genres,
			selectedGenre,
			pageSize,
			selectedPage,
		} = this.state;

		const listGroupItems = [{ _id: "", name: "All Genre" }, ...genres];
		let movies = [...allMovies];
		if (selectedGenre && selectedGenre._id)
			movies = allMovies.filter((m) => m.genre._id === selectedGenre._id);

		const pagedResult = paginate(movies, selectedPage, pageSize);

		if (!pagedResult.total)
			return <p>There are no movies in the database.</p>;
		return (
			<div className="row">
				<div className="col-3">
					<ListGroup
						items={listGroupItems}
						selectedItem={selectedGenre}
						onSelect={this.handleSelect}
					/>
				</div>
				<div className="col">
					<p>Showing {pagedResult.total} movies in the database.</p>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Title</th>
								<th scope="col">Genre</th>
								<th scope="col">Stock</th>
								<th scope="col">Rate</th>
								<th scope="col"></th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							{pagedResult.pagedItems.map((movie) => (
								<tr key={movie._id}>
									<td>{movie.title}</td>
									<td>{movie.genre.name}</td>
									<td>{movie.numberInStock}</td>
									<td>{movie.dailyRentalRate}</td>
									<td>
										<Like
											liked={movie.liked}
											onClick={() => {
												this.handleLike(movie);
											}}
										/>
									</td>
									<td>
										<button
											className="btn btn-danger"
											onClick={() => {
												this.handleDelete(movie);
											}}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<Pagination
						pagesCount={pagedResult.totalPages}
						selectedPage={pagedResult.page}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
