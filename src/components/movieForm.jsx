import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
	state = {
		data: {
			title: "",
			genreId: "",
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
		genreId: Joi.string().required().label("Genre"),
		numberInStock: Joi.number().integer().min(0).required().label("Stock"),
		dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
	};

	loadGenres = async () => {
		const genres = await getGenres();
		this.setState({ genres: [{ _id: "", name: "" }, ...genres] });
	};
	loadMovie = async (id) => {
		try {
			if (id === "new") return;
			let movie = await getMovie(id);
			movie = { genreId: movie.genre._id, ...movie };
			this.setState({ data: movie });
		} catch (error) {
			this.props.history.replace("/not-found");
		}
	};

	componentDidMount() {
		const { id } = this.props.match.params;
		this.loadGenres();
		this.loadMovie(id);
	}

	async doSubmit() {
		const { data } = this.state;
		await saveMovie(data);
		this.props.history.push("/movies");
	}
	render() {
		const { genres } = this.state;
		return (
			<div>
				<h1>Movie</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("title", "Title")}
					{this.renderSelect("genreId", "Genre", genres)}
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
