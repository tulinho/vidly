import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import paginate from "../paginate";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import auth from "../services/authService";
import logger from "../services/loggingService";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		selectedPage: 1,
		selectedGenre: "",
		searchQuery: "",
		sortColumn: { path: "title", order: "asc" },
		pageSize: 4,
	};
	async componentDidMount() {
		this.setState({
			movies: await getMovies(),
			genres: [{ _id: "", name: "All Genres" }, ...(await getGenres())],
		});
	}
	handleSelect = (genre) => {
		this.setState({
			selectedGenre: genre,
			selectedPage: 1,
			searchQuery: "",
		});
	};
	handleChangeSearch = (query) => {
		this.setState({
			searchQuery: query,
			selectedPage: 1,
			selectedGenre: "",
		});
	};
	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const selectedMovie = movies.find((m) => m._id === movie._id);
		selectedMovie.liked = !selectedMovie.liked;
		this.setState({ movies });
	};
	tryToDeleteMovie = async (movie) => {
		try {
			await deleteMovie(movie._id);
		} catch (error) {
			logger.error(error);
			toast.error("This movie has already been deleted.");
			return false;
		}
		return true;
	};
	handleDelete = async (movie) => {
		const { movies: originalMovies } = this.state;
		const movies = this.state.movies.filter(
			(item) => item._id !== movie._id
		);
		this.setState({ movies });
		if (!(await this.tryToDeleteMovie(movie)))
			this.setState({ movies: originalMovies });
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
		const searchedMovies = this.searchMoviesByTitle(filteredMovies);
		const sortedMovies = _.orderBy(
			searchedMovies,
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
	searchMoviesByTitle(allMovies) {
		const { searchQuery } = this.state;
		const movies = allMovies.filter((m) =>
			m.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
		return movies;
	}
	render() {
		const user = auth.getCurrentUser();
		const {
			movies,
			genres,
			selectedGenre,
			selectedPage,
			sortColumn,
			searchQuery,
		} = this.state;
		const { totalItems, totalPages, pagedItems } = this.getPagedData();

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
					{user && (
						<Link
							to="/movies/new"
							className="btn btn-primary"
							style={{ marginBottom: 20 }}
						>
							New Movie
						</Link>
					)}
					<p>Showing {totalItems} movies in the database.</p>
					<SearchBox
						placeHolder="Search..."
						value={searchQuery}
						onChange={this.handleChangeSearch}
					/>
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
