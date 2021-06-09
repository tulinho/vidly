import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
	//this.props.match.params.id
	state = {
		data: {
			title: "",
			idGenre: "",
			numberInStock: "",
			dailyRentalRate: "",
		},
		errors: {},
		genres: [],
	};

	schema = {
		_id: Joi.string(),
		genre: Joi.object(),
		title: Joi.string().required().label("Title"),
		idGenre: Joi.string().required().label("Genre"),
		numberInStock: Joi.number().integer().min(0).required().label("Stock"),
		dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
	};

	componentDidMount() {
		const { id } = this.props.match.params;
		const genres = getGenres();
		this.setState({ genres: [{ _id: "", name: "" }, ...genres] });

		if (id === "new") return;

		let movie = getMovie(id);
		if (!movie) {
			this.props.history.replace("/not-found");
			return;
		}
		movie = { idGenre: movie.genre._id, ...movie };
		this.setState({ data: movie }); //this.mapToViewModel(movie);
	}

	doSubmit() {
		const { data, genres } = this.state;
		data.genre = genres.find((m) => m._id === data.idGenre);
		delete data["idGenre"];
		saveMovie(data);
		this.props.history.replace("/movies");

		console.log("Submited");
	}
	render() {
		const { genres } = this.state;
		return (
			<div>
				<h1>Movie</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("title", "Title")}
					{this.renderSelect("idGenre", "Genre", genres)}
					{this.renderInput("numberInStock", "Stock", "number")}
					{this.renderInput("dailyRentalRate", "Rate", "number")}
					<br />
					{this.renderSubmitButton("Save")}
				</form>
			</div>
		);
	}
}

export default MovieForm;
