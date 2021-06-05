import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import paginate from "../paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		selectedPage: 1,
		selectedGenre: "",
		sortColumn: { path: "title", order: "asc" },
		pageSize: 4,
	};
	componentDidMount() {
		this.setState({
			movies: getMovies(),
			genres: [{ _id: "", name: "All Genres" }, ...getGenres()],
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
	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};
	getPagedData = () => {
		const {
			movies: allMovies,
			pageSize,
			selectedGenre,
			selectedPage,
			sortColumn,
		} = this.state;

		const filteredMovies = this.filterMoviesByGenre(
			allMovies,
			selectedGenre
		);
		const sortedMovies = _.orderBy(
			filteredMovies,
			[sortColumn.path],
			[sortColumn.order]
		);
		return paginate(sortedMovies, selectedPage, pageSize);
	};
	filterMoviesByGenre(allMovies, selectedGenre) {
		let movies = [...allMovies];
		if (selectedGenre && selectedGenre._id)
			movies = allMovies.filter((m) => m.genre._id === selectedGenre._id);
		return movies;
	}
	render() {
		const { genres, selectedGenre, selectedPage, sortColumn } = this.state;
		const { totalItems, totalPages, pagedItems } = this.getPagedData();

		if (!totalItems) return <p>There are no movies in the database.</p>;
		return (
			<div className="row">
				<div className="col-3">
					<ListGroup
						items={genres}
						selectedItem={selectedGenre}
						onSelect={this.handleSelect}
					/>
				</div>
				<div className="col">
					<p>Showing {totalItems} movies in the database.</p>
					<MoviesTable
						movies={pagedItems}
						sortColumn={sortColumn}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>
					<Pagination
						pagesCount={totalPages}
						selectedPage={selectedPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
