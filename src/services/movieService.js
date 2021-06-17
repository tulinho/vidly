import http from "./httpService";
import config from "../config.json";

const { apiEndpoint } = config;
const moviesRoute = "/movies";

const url = (id) => {
	const url = `${apiEndpoint}${moviesRoute}`;
	if (!id) return url;
	return `${url}/${id}`;
};

export async function getMovies() {
	const { data: movies } = await http.get(url());
	return movies;
}

export async function getMovie(id) {
	const { data: movie } = await http.get(url(id));
	return movie;
}

export async function saveMovie(movie) {
	if (!movie._id) movie = await createMovie(movie);
	else movie = await updateMovie(movie);
	return movie;
}

async function createMovie(movie) {
	const { data: newMovie } = await http.post(url(), movie);
	return newMovie;
}

async function updateMovie(movie) {
	const { data: updatedMovie } = await http.put(
		url(movie._id),
		mapToModel(movie)
	);
	return updatedMovie;
}

function mapToModel(movie) {
	let newMovie = { ...movie };
	delete newMovie._id;
	delete newMovie.genre;
	return newMovie;
}

export async function deleteMovie(id) {
	const { data: movie } = await http.delete(url(id));
	return movie;
}
